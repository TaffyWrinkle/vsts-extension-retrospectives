﻿using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CollaborationStateService.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.KeyVault;
using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.AzureKeyVault;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Tokens;

namespace CollaborationStateService
{
    public class Startup
    {
        public Startup( IHostingEnvironment hostingEnvironment )
        {
            IConfigurationBuilder builder = new ConfigurationBuilder()
                .SetBasePath( hostingEnvironment.ContentRootPath )
                .AddJsonFile( "appsettings.json", optional: false, reloadOnChange: true )
                .AddJsonFile( $"appsettings.{hostingEnvironment.EnvironmentName}.json", optional: true )
                .AddEnvironmentVariables();

            // Build an intermediary config to get the azure key vault name from the environment variables
            IConfigurationRoot config = builder.Build();

            var keyVaultEndpoint = config.GetValue<string>( "AzureKeyVaultSettings:Endpoint" );
            var azureServiceTokenProvider = new AzureServiceTokenProvider();
            var keyVaultClient = new KeyVaultClient(
                new KeyVaultClient.AuthenticationCallback(
                    azureServiceTokenProvider.KeyVaultTokenCallback ) );

            builder.AddAzureKeyVault(
                keyVaultEndpoint,
                keyVaultClient,
                new ReflectKeyVaultSecretManager()
            );

            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices( IServiceCollection services )
        {
            // Retrieve the environment specific extension secret from the azure vault.
            IConfigurationSection certificateData = Configuration.GetSection( "VSTSExtensionCertificates" );
            var combinedKeys = certificateData.AsEnumerable()
                .Where( keyValue => !string.IsNullOrWhiteSpace( keyValue.Value ) )
                .Select( x => x.Value ).ToList();
            // Retrieve additional dev extensions secrets from application settings.
            IConfigurationSection developerCertificateData = Configuration.GetSection( "DeveloperOverrideCertificates" );
            combinedKeys.AddRange( developerCertificateData.AsEnumerable()
                .Where( keyValue => !string.IsNullOrWhiteSpace( keyValue.Value ) )
                .Select( x => x.Value ) );

            services.AddAuthentication( options =>
           {
               options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
               options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
           } )
            .AddJwtBearer( options =>
           {
               // Configure JWT Bearer Auth to expect our security key
               options.TokenValidationParameters = new TokenValidationParameters
               {
                   LifetimeValidator = ( before, expires, token, param ) =>
                   {
                       return expires > DateTime.UtcNow;
                   },
                   ValidateAudience = false,
                   ValidateIssuer = false,
                   ValidateActor = false,
                   ValidateLifetime = true,
                   RequireSignedTokens = true,
                   RequireExpirationTime = true,
                   IssuerSigningKeys = combinedKeys.Select( e => new SymmetricSecurityKey( Encoding.UTF8.GetBytes( e ) ) ),
               };

               // We have to hook the OnMessageReceived event in order to
               // allow the JWT authentication handler to read the access
               // token from the query string when a WebSocket or 
               // Server-Sent Events request comes in.
               options.Events = new JwtBearerEvents
               {
                   OnMessageReceived = context =>
                   {
                       StringValues accessToken = context.Request.Query["access_token"];

                       // If the request is for our hub...
                       PathString path = context.HttpContext.Request.Path;
                       if ( !string.IsNullOrEmpty( accessToken ) &&
                           path.StartsWithSegments( "/collaborationUpdates" ) )
                       {
                           // Read the token out of the query string
                           context.Token = accessToken;
                       }

                       return Task.CompletedTask;
                   }
               };
           } );

            services.AddMvc();//.SetCompatibilityVersion( CompatibilityVersion.Version_2_1 );
            services.AddSignalR()
                .AddAzureSignalR( Configuration.GetValue<string>( "SignalRServiceConnectionString" ) );
            services.Configure<AppInsightsSettings>( Configuration.GetSection( "ApplicationInsights" ) );
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure( IApplicationBuilder app, IHostingEnvironment env )
        {
            if ( env.IsDevelopment() )
            {
                app.UseDeveloperExceptionPage();
            }

            var allowedOrigins = new string[] {
                "https://reflectteam.gallerycdn.vsassets.io",
                "https://reflectteam.gallery.vsassets.io",
                "https://ms-devlabs.gallerycdn.vsassets.io",
                "https://ms-devlabs.gallery.vsassets.io"
            };

            app.UseCors( builder =>
            {
                builder.WithOrigins( allowedOrigins )
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
            } );

            app.UseWebSockets();

            app.UseAuthentication();

            app.UseAzureSignalR( routes =>
            {
                routes.MapHub<ReflectBackend.ReflectHub>( "/collaborationUpdates" );
            } );

            app.Use(async (context, next) =>
            {
                context.Response.Headers.Add("X-Content-Type-Options", "nosniff");
                await next();
            });

            app.UseMvc();
        }
    }
}
