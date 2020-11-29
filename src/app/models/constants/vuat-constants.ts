export class VuatConstants {

  static readonly PLAN_ANSWER: any = {
    answered: {name: 'ANSWERED', type: true},
    pending: {name: 'PENDING', type: false},
  };

  static readonly SECTION_CONTROL: any = {
    available: {name: 'AVAILABLE'},
    busy: {name: 'BUSY'},
  };

  static readonly CATEGORIES: any = {
    application: {acronym: 'AP'},
    goals: {acronym: 'GO'},
    variables: {acronym: 'VM'},
    participants: {acronym: 'PA'},
    tasks: {acronym: 'TM'},
    procedure: {acronym: 'PR'},
    data: {acronym: 'DT'},
    threats: {acronym: 'TH'},
  };

  static readonly SMART_CITY_CATEGORY: any = {
    dataManagement: {acronym: 'DMN'},
    applicationExecutionEnvironment: {acronym: 'AEE'},
    sensorNetworkManagement: {acronym: 'SNM'},
    dataProcessing: {acronym: 'DPR'},
    dataAccess: {acronym: 'DTA'},
    serviceManagement: {acronym: 'SMN'},
    toolsforSoftwareDevelopment: {acronym: 'TSD'},
    definingACityModel: {acronym: 'DCM'},
  };

  static readonly GENERIC_SELECT_OPTIONS: any = {
    options: [
      {value: true, label: 'YES'},
      {value: false, label: 'NO'},
    ],
  };

  static readonly SELECT_OPTIONS: any = {
    dataManagement: [
      {value: true, label: 'YES'},
      {value: false, label: 'NO', checked: true},
    ],
    applicationExecutionEnvironment: [
      {value: true, label: 'YES'},
      {value: false, label: 'NO', checked: true},
    ],
    sensorNetworkManagement: [
      {value: true, label: 'YES'},
      {value: false, label: 'NO', checked: true},
    ],
    dataProcessing: [
      {value: true, label: 'YES'},
      {value: false, label: 'NO', checked: true},
    ],
    dataAccess: [
      {value: true, label: 'YES'},
      {value: false, label: 'NO', checked: true},
    ],
    serviceManagement: [
      {value: true, label: 'YES'},
      {value: false, label: 'NO', checked: true},
    ],
    toolsforSoftwareDevelopment: [
      {value: true, label: 'YES'},
      {value: false, label: 'NO', checked: true},
    ],
    definingACityModel: [
      {value: true, label: 'YES'},
      {value: false, label: 'NO', checked: true},
    ],
  };

  static readonly USABILITY_ATRIBUTES: Array<any> = ['LRN', 'EFF', 'USR', 'ERR', 'STF'];

  static readonly PLAN_QUESTIONS: Array<any> = [
    {
      "section": "Application",
      "key": "AP",
      "parentQuestions": [
        {
          "title": "1. What will be assessed?",
          "questions": [
            {
              "objKey": "AP-PN",
              "title": "1.1 What is the name of the application?"
            },
            {
              "objKey": "AP-PD",
              "title": "1.2 How would you describe the application?"
            }
          ]
        },
        {
          "title": "2. Is it a smart city application? ",
          "instruction": "To calculate the smart city factor of the application, choose 'YES' on the drop-down lists if the app meets each smart city functional requirement or 'NO' if otherwise.",
          "hint": "",
          "questions": [
            {
              "objKey": "PERC",
              "title": "Smart City Percentage: ",
              "hint": "Percentage calculated from the answers acquired below."
            },
            {
              "objKey": "DMN",
              "title": "2.1 Data Management: ",
              "subTitle": "Does the application use NoSQL DBs for unstructured or semi-structured data, relational DBs for structured data, Big Data tools to analyze and process data or report and image generators for data visualization?"
            },
            {
              "objKey": "AEE",
              "title": "2.2 Application Execution Environment: ",
              "subTitle": "Does the platform offer an environment for the deployment of services and applications or a service for running applications developed with the platform's own tools?"
            },
            {
              "objKey": "SNM",
              "title": "2.3 Sensor Network Management: ",
              "subTitle": " Does the application manage sensors that collect data from the environment, sensors that verify the functioning of urban systems or sensors that monitor traffic flow?"
            },
            {
              "objKey": "DPR",
              "title": "2.4 Data processing: ",
              "subTitle": "Does the platform use inference machines, workflow processors or Big Data tools for processing large amounts of data?"
            },
            {
              "objKey": "DTA",
              "title": "2.5 Data Access: ",
              "subTitle": "Are the data collected available through open data portals in standardized formats and with associated descriptive metadata, well-defined APIs that facilitate the development of automated applications or publish / subscribe services?"
            },
            {
              "objKey": "SMN",
              "title": "2.6 Service Management: ",
              "subTitle": "Does the application use components for data processing such as inference machines and machine learning algorithms, components for the execution of workflows and user management services for the platform or deployment of services on the platform that are available for other city applications?"
            },
            {
              "objKey": "TSD",
              "title": "2.7 Tools for Software Development: ",
              "subTitle": "Does the platform use visual interfaces for the description of applications using the data sources and services available on the platform, tools for the description of workflows, tools for reporting and data analysis or a kit for the development of applications (Software Development Kit or SDK) with several integrated tools?"
            },
            {
              "objKey": "DCM",
              "title": "2.8 Defining a City Model: ",
              "subTitle": "Does the application offer representation of static aspects of the city, such as the city map with the location of streets and public facilities or representation of dynamic aspects of the city, such as the flow of vehicles and congestion zones at different times of the day and days of the week?"
            }
          ]
        }
      ]
    },
    {
      "section": "Goals",
      "key": "GO",
      "parentQuestions": [
        {
          "title": "3. What are the assessment goals?",
          "instruction": "A - To correctly fill in the assessment goals, it is not necessary to describe the goals pertaining to every usability attribute, but only to those that are relevant to the project. B - To assure the clarity and precision of the assessment goals descriptions, please consider whether they have been clearly stated with specific objectives.",
          "questions": [
            {
              "objectKey": "LRN",
              "title": "3.1 Learnability: ",
              "subTitle": "How easy it is to learn the main system functionality and gain pro- ficiency to complete the job. We usually assess this by measuring the time a user spends working with the system before that user can complete certain tasks in the time it would take an expert to com- plete the same tasks. This attribute is very important for novice users. [REF001]"
            },
            {
              "objectKey": "EFF",
              "title": "3.2 Efficiency: ",
              "subTitle": "The number of tasks per unit of time that the user can perform using the system. We look for the maximum speed of user task performance. The higher system usability is, the faster the user can perform the task and complete the job. [REF001]"
            },
            {
              "objectKey": "USR",
              "title": "3.3 User retention over time: ",
              "subTitle": "It is critical for intermittent users to be able to use the system without having to climb the learn- ing curve again. This attribute reflects how well the user remembers how the system works after a period of nonusage. [REF001]"
            },
            {
              "objectKey": "ERR",
              "title": "3.4 Error rate: ",
              "subTitle": "This attribute contributes negatively to usability. It does not refer to system errors. On the contrary, it addresses the number of errors the user makes while performing a task. Good usability implies a low error rate. Errors reduce efficiency and user satisfaction, and they can be seen as a failure to communicate to the user the right way of doing things. [REF001]"
            },
            {
              "objectKey": "STF",
              "title": "3.5 Satisfaction: ",
              "subTitle": "This shows a user’s subjective impression of the system. [REF001]"
            }
          ]
        }
      ]
    },
    {
      "section": "Variables and Measurement",
      "key": "VM",
      "parentQuestions": [
        {
          "key": "VM-4",
          "title": "4. Which variables will be measured during the assessment?",
          "instruction": "Note that the variables are associated with the attributes of usability. The ones that have not been filled with the goals descriptions should not have variables associated.",
          "questions": [
            {
              "objectKey": "LRN",
              "title": "Learnability: "
            },
            {
              "objectKey": "EFF",
              "title": "Efficiency: "
            },
            {
              "objectKey": "USR",
              "title": "User retention over time: "
            },
            {
              "objectKey": "ERR",
              "title": "Error rate: "
            },
            {
              "objectKey": "STF",
              "title": "Satisfaction: "
            }
          ]
        },
        {
          "key": "VM-5",
          "title": "5. How will the listed variables be obtained?",
          "instruction": "Describe the methods and criteria for measuring each of the variables listed above.",
          "questions": [
            {
              "objectKey": "LRN",
              "title": "Learnability: "
            },
            {
              "objectKey": "EFF",
              "title": "Efficiency: "
            },
            {
              "objectKey": "USR",
              "title": "User retention over time: "
            },
            {
              "objectKey": "ERR",
              "title": "Error rate: "
            },
            {
              "objectKey": "STF",
              "title": "Satisfaction: "
            }
          ]
        },
        {
          "key": "VM-6",
          "title": "6. Which of the suggested scales will be used?",
          "hint": "Note that it is possible to choose multiple scales."
        }
      ]
    },
    {
      "section": "Participants",
      "key": "PA",
      "parentQuestions": [
        {
          "key": "PA-7",
          "title": "7. How many participants will be needed for the assessment?",
        },
        {
          "key": "PA-8",
          "title": "8. Will it be an in-person or a remote participation?"
        },
        {
          "key": "PA-9",
          "title": "9. What form of compensation, if any, will the participants receive?",
          "instruction": "A. If the participants will be compensated, describe the form of compensation they will receive.\n\ne.g. money, grade, credit, gift, etc.\n\nB. If otherwise, specify it will be a volunteer participation."
        },
        {
          "key": "PA-10",
          "title": "10. What are the eligibility criteria for the participants?",
          "instruction": "Describe the characteristics that must be shared by all participants involved in the assessment."
        },
        {
          "key": "PA-11",
          "title": "11. Will a demographic questionnaire be used to collect information from the participants?",
          "instruction": "If the answer is 'YES', describe how the data obtained will be used."
        },
        {
          "key": "PA-12",
          "title": "12. How will the participants be instructed?"
        },
        {
          "key": "PA-13",
          "title": "13. Which questions will be asked to the participants?",
          "instruction": "Note that your questions should be aligned to the described goals above in order to maintain coherence"
        }
      ]
    },
    {
      "section": "Tasks and Materials",
      "key": "TM",
      "parentQuestions": [
        {
          "key": "TM-14",
          "title": "14. What instruments, materials, technology, and tools will be used and how?",
          "instruction": "Example: Computer specifications, operating system, frameworks, etc.",
          "placeholder": "Describe the tools here"
        },
        {
          "key": "TM-15",
          "title": "15. What tasks will the participants need to perform?",
          "placeholder": "Describe the tasks here"
        },
        {
          "key": "TM-16",
          "title": "16. How much time should each of the tasks take?",
          "instruction": "Feel free to describe the duration of each task, in minutes in case of a number.",
          "placeholder": "Describe here"
        },
        {
          "key": "TM-17",
          "title": "17. What criteria will be used to determine when users have completed each task correctly?",
          "placeholder": "Describe the criteria here"
        }
      ]
    },
    {
      "section": "Procedure",
      "key": "PR",
      "parentQuestions": [
        {
          "key": "PR-18",
          "title": "18. How will the application be assessed?",
          "instruction": "A. To correctly fill in the assessment goals, it is not necessary to describe the goals pertaining to every usability attribute, but only to those that are relevant to the project.\nB. To assure the clarity and precision of the assessment goals descriptions, please consider whether they have been clearly stated with specific objectives.",
          "questions": [
            {
              "key": "PR-18-1",
              "title": "18.1 When will it occur?"
            },
            {
              "key": "PR-18-2",
              "title": "18.2 Where will it occur?"
            },
            {
              "key": "PR-18-3",
              "title": "18.3 How will it occur?"
            },
            {
              "key": "PR-18-4",
              "title": "18.4 How much time will it require?"
            }
          ]
        },
        {
          "key": "PR-19",
          "title": "19. How will the design of the assessment be?",
          "instruction": "A. Name the possible steps.\nB. Detail the steps. C. Add the steps in the order they are expected to be performed."
        },
        {
          "key": "PR-20",
          "title": "20. Will the participants be able to ask questions during the assessment?"
        },
        {
          "key": "PR-21",
          "title": "21. Will there be a pilot assessment?",
          "instruction": "If the answer is 'YES', describe how the pilot will be conducted.",
          "placeholder": "Describe the pilot here"
        }
      ]
    },
    {
      "section": "Data collection and Data analysis",
      "key": "DT",
      "parentQuestions": [
        {
          "key": "DT-22",
          "title": "22. What will be the data collection procedure?",
          "placeholder": "Describe the data collection procedure here"
        },
        {
          "key": "DT-23",
          "title": "23. How will the data collected be analyzed?",
          "placeholder": "Describe the procedure here"
        },
        {
          "key": "DT-24",
          "title": "24. Will statistical methods be used?",
          "instruction": "If the answer is 'YES', describe the methods.",
          "placeholder": "Describe the methods here"
        }
      ]
    },
    {
      "section": "Threats to validity",
      "key": "TH",
      "parentQuestions": [
        {
          "key": "TH-25",
          "title": "25. Are there any threats to the validity of the assessment?",
          "questions": [
            {
              "key": "TH-25-1",
              "title": "25.1 What are the threats to the validity of the assessment?",
              "placeholder": "Describe the threats here"
            },
            {
              "key": "TH-25-2",
              "title": "25.2 How will the threats to validity be controlled?",
              "placeholder": "Describe how the threats wil be controlled here"
            },
            {
              "key": "TH-25-3",
              "title": "25.3 Are there any limitations for the assessment?",
              "placeholder": "Describe the limitations here"
            },
            {
              "key": "TH-25-4",
              "title": "25.4 Are the ethical aspects of the assessment well defined for the participants?",
              "instruction": "If the answer is 'YES', describe how the ethical aspects are defined.",
              "placeholder": "Describe how the ethical aspects are defined here"
            },
            {
              "key": "TH-25-5",
              "title": "25.5 What are the biases of the assessment, if any?",
              "placeholder": "Describe the bias here"
            }
          ]
        }
      ]
    }
  ];

  static readonly REFERENCES: Array<any> = [
    {
      citation: "REF001",
      work: "FERRÉ, X. et al. Usability basics for software developers, 2001."
    },

    {
      citation: "REF002",
      work: "LEWIS, J. R. The System Usability Scale: Past, Present, and Future, 2018."
    },

    {
      citation: "REF003",
      work: "ERDINÇ, O.; LEWIS, J. R. Psychometric Evaluation of the T-CSUQ: The Turkish Version of the Computer System Usability Questionnaire, 2013."
    },

    {
      citation: "REF004",
      work: "CHIN, J.; DIEHL, V.; NORMAN, K. L. Development of an Instrument Measuring User Satisfaction of the Human-Computer Interface, 1988."
    },

    {
      citation: "REF005",
      work: "KIRAKOWSKI, J. The use of Questionnaire Methods for Usability Assessment, 1994."
    }
  ]

}
