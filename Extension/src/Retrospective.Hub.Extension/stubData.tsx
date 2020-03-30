﻿import { FeedbackType, WorkItemGroup } from './interfaces/workItem';

export const workItemGroups: WorkItemGroup[] = [
  {
    name: 'What went well',
    feedbackType: FeedbackType.Positive,
    iconName: 'CompletedSolid',
    workItems: [
      {
        iconName: 'CompletedSolid',
        workItem: {
          id: 1,
          rev: 1234.0001,
          fields: {
            'TFSUnknownFieldName---likes': 15,
            'System.CreatedBy': 'Pratyush Oak',
            'System.Title': 'PRs are more modular. Easier to code review',
            'System.WorkItemType': 'Positive',
            'System.CreatedByProfileImage': 'https://www.publicdomainpictures.net/pictures/220000/velka/koala.jpg',
            'System.ChangedDate': 'July 10, 2018',
          },
          url: 'https://reflect-retrospective.visualstudio.com/Retrospective/_workitems/edit/3',
          relations: [],
          _links: {},
        },
        upvotes: 0,
        isLinkedForGroup: false,
        isParentForGroup: false,
      },
      {
        iconName: 'CompletedSolid',
        workItem: {
          id: 2,
          rev: 5678.0002,
          fields: {
            'TFSUnknownFieldName---likes': 15,
            'System.CreatedBy': 'Andy Stumpp',
            'System.Title': 'Demos to the DES leadership went well.',
            'System.WorkItemType': 'Positive',
            'System.CreatedByProfileImage': 'https://www.publicdomainpictures.net/pictures/220000/velka/koala.jpg',
            'System.ChangedDate': 'July 10, 2018',
          },
          url: 'https://reflect-retrospective.visualstudio.com/Retrospective/_workitems/edit/3',
          relations: [],
          _links: {},
        },
        upvotes: 0,
        isLinkedForGroup: false,
        isParentForGroup: false,
      },
      {
        iconName: 'CompletedSolid',
        workItem: {
          id: 3,
          rev: 9012.0003,
          fields: {
            'TFSUnknownFieldName---likes': 15,
            'System.CreatedBy': 'Kevin Wilkinson',
            'System.Title': 'Prod Cluster SF Creation went smoothly.',
            'System.WorkItemType': 'Positive',
            'System.CreatedByProfileImage': 'https://www.publicdomainpictures.net/pictures/220000/velka/koala.jpg',
            'System.ChangedDate': 'July 10, 2018',
          },
          url: 'https://reflect-retrospective.visualstudio.com/Retrospective/_workitems/edit/3',
          relations: [],
          _links: {},
        },
        upvotes: 0,
        isLinkedForGroup: false,
        isParentForGroup: false,
      },
      {
        iconName: 'CompletedSolid',
        workItem: {
          id: 4,
          rev: 9012.0003,
          fields: {
            'TFSUnknownFieldName---likes': 15,
            'System.CreatedBy': 'Kevin Wilkinson',
            'System.Title': 'Good teamwork!',
            'System.WorkItemType': 'Positive',
            'System.CreatedByProfileImage': 'https://www.publicdomainpictures.net/pictures/220000/velka/koala.jpg',
            'System.ChangedDate': 'July 10, 2018',
          },
          url: 'https://reflect-retrospective.visualstudio.com/Retrospective/_workitems/edit/3',
          relations: [],
          _links: {},
        },
        upvotes: 0,
        isLinkedForGroup: false,
        isParentForGroup: false,
      },
      {
        iconName: 'CompletedSolid',
        workItem: {
          id: 5,
          rev: 9012.0003,
          fields: {
            'TFSUnknownFieldName---likes': 15,
            'System.CreatedBy': 'Andy Stumpp',
            'System.Title': 'Office Fabric UI is beautiful.',
            'System.WorkItemType': 'Positive',
            'System.CreatedByProfileImage': 'https://www.publicdomainpictures.net/pictures/220000/velka/koala.jpg',
            'System.ChangedDate': 'July 10, 2018',
          },
          url: 'https://reflect-retrospective.visualstudio.com/Retrospective/_workitems/edit/3',
          relations: [],
          _links: {},
        },
        upvotes: 0,
        isLinkedForGroup: false,
        isParentForGroup: false,
      },
    ],
  },
  {
    name: "What didn't go well",
    feedbackType: FeedbackType.Negative,
    iconName: 'EmojiDisappointed',
    workItems: [
      {
        iconName: 'EmojiDisappointed',
        workItem: {
          id: 6,
          rev: 1234.0001,
          fields: {
            'TFSUnknownFieldName---likes': 15,
            'System.CreatedBy': 'Pratyush Oak',
            'System.Title': 'We had to work on too many bugs compared to other sprints.',
            'System.WorkItemType': 'Negative',
            'System.CreatedByProfileImage': 'https://www.publicdomainpictures.net/pictures/220000/velka/koala.jpg',
            'System.ChangedDate': 'July 10, 2018',
          },
          url: 'https://reflect-retrospective.visualstudio.com/Retrospective/_workitems/edit/3',
          relations: [],
          _links: {},
        },
        upvotes: 0,
        isLinkedForGroup: false,
        isParentForGroup: false,
      },
      {
        iconName: 'EmojiDisappointed',
        workItem: {
          id: 7,
          rev: 5678.0002,
          fields: {
            'TFSUnknownFieldName---likes': 15,
            'System.CreatedBy': 'Perth Charernwattanagul',
            'System.Title': 'No customer support for Swashbuckle.',
            'System.WorkItemType': 'Negative',
            'System.CreatedByProfileImage': 'https://www.publicdomainpictures.net/pictures/220000/velka/koala.jpg',
            'System.ChangedDate': 'July 10, 2018',
          },
          url: 'https://reflect-retrospective.visualstudio.com/Retrospective/_workitems/edit/3',
          relations: [],
          _links: {},
        },
        upvotes: 0,
        isLinkedForGroup: false,
        isParentForGroup: false,
      },
      {
        iconName: 'EmojiDisappointed',
        workItem: {
          id: 8,
          rev: 9012.0003,
          fields: {
            'TFSUnknownFieldName---likes': 15,
            'System.CreatedBy': 'Pratyush Oak',
            'System.Title': 'Azure help docs is a mess.',
            'System.WorkItemType': 'Negative',
            'System.CreatedByProfileImage': 'https://www.publicdomainpictures.net/pictures/220000/velka/koala.jpg',
            'System.ChangedDate': 'July 10, 2018',
          },
          url: 'https://reflect-retrospective.visualstudio.com/Retrospective/_workitems/edit/3',
          relations: [],
          _links: {},
        },
        upvotes: 0,
        isLinkedForGroup: false,
        isParentForGroup: false,
      },
    ],
  },
];
