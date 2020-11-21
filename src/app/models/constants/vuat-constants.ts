export class VuatConstants {

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
          "instruction": "A. To correctly fill in the assessment goals, it is not necessary to describe the goals pertaining to every usability attribute, but only to those that are relevant to the project.\n\nB. To assure the clarity and precision of the assessment goals descriptions, please consider whether they have been clearly stated with specific objectives.",
          "questions": [
            {
              "objectKey": "LRN",
              "title": "3.1 Learnability: ",
              "subTitle": "How easy it is to learn the main system functionality and gain pro- ficiency to complete the job. We usually assess this by measuring the time a user spends working with the system before that user can complete certain tasks in the time it would take an expert to com- plete the same tasks. This attribute is very important for novice users. [REF001]",
              "hint": "",
              "considerations": {
                "state": "Consider whether the experiment’s goals describe:",
                "items": [
                  "A clear purpose.",
                  "Specific Objectives.",
                  "The reasons for undertaking the experiment, clearly and explicitly stated."
                ]
              }
            },
            {
              "objectKey": "EFF",
              "title": "3.2 Efficiency: ",
              "subTitle": "The number of tasks per unit of time that the user can perform using the system. We look for the maximum speed of user task performance. The higher system usability is, the faster the user can perform the task and complete the job. [REF001]",
              "hint": "",
              "considerations": {
                "state": "Consider whether the experiment’s goals describe:",
                "items": [
                  "A clear purpose.",
                  "Specific Objectives.",
                  "The reasons for undertaking the experiment, clearly and explicitly stated."
                ]
              }
            },
            {
              "objectKey": "USR",
              "title": "3.3 User retention over time: ",
              "subTitle": "It is critical for intermittent users to be able to use the system without having to climb the learn- ing curve again. This attribute reflects how well the user remembers how the system works after a period of nonusage. [REF001]",
              "hint": "",
              "considerations": {
                "state": "Consider whether the experiment’s goals describe:",
                "items": [
                  "A clear purpose.",
                  "Specific Objectives.",
                  "The reasons for undertaking the experiment, clearly and explicitly stated."
                ]
              }
            },
            {
              "objectKey": "ERR",
              "title": "3.4 Error rate: ",
              "subTitle": "This attribute contributes negatively to usability. It does not refer to system errors. On the contrary, it addresses the number of errors the user makes while performing a task. Good usability implies a low error rate. Errors reduce efficiency and user satisfaction, and they can be seen as a failure to communicate to the user the right way of doing things. [REF001]",
              "hint": "",
              "considerations": {
                "state": "Consider whether the experiment’s goals describe:",
                "items": [
                  "A clear purpose.",
                  "Specific Objectives.",
                  "The reasons for undertaking the experiment, clearly and explicitly stated."
                ]
              }
            },
            {
              "objectKey": "STF",
              "title": "3.5 Satisfaction: ",
              "subTitle": "This shows a user’s subjective impression of the system. [REF001]",
              "hint": "",
              "considerations": {
                "state": "Consider whether the experiment’s goals describe:",
                "items": [
                  "A clear purpose.",
                  "Specific Objectives.",
                  "The reasons for undertaking the experiment, clearly and explicitly stated."
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "section": "Tasks and Materials",
      "key": "TM",
      "parentQuestions": [
        {
          "title": "14. What instruments, materials, technology, and tools will be used and how?"
        },
        {
          "title": "15. What tasks will the participants need to perform?"
        },
        {
          "title": "16. How much time should each of the tasks take?"
        },
        {
          "title": "17. What criteria will be used to determine when users have completed each task correctly?"
        }
      ]
    },
    {
      "section": "Variables and Measurement",
      "key": "VM",
      "parentQuestions": [
        {
          "title": "4. Which variables will be measured during the assessment?",
          "hint": "Note that the variables are associated with the attributes of usability. The ones that have not been filled with the goals descriptions should not have variables associated.",
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
          "title": "5. How will the listed variables be obtained?",
          "instruction": "Describe the methods and criteria for measuring each of the variables listed above."
        },
        {
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
          "title": "7. How many participants will be needed for the assessment?"
        },
        {
          "title": "8. Will it be an in-person or a remote participation?"
        },
        {
          "title": "9. What form of compensation, if any, will the participants receive?",
          "instruction": "A. If the participants will be compensated, describe the form of compensation they will receive.\n\ne.g. money, grade, credit, gift, etc.\n\nB. If otherwise, specify it will be a volunteer participation."
        },
        {
          "title": "10. What are the eligibility criteria for the participants?",
          "instruction": "Describe the characteristics that must be shared by all participants involved in the assessment."
        },
        {
          "title": "11. Will a demographic questionnaire be used to collect information from the participants?",
          "instruction": "If the answer is 'YES', describe how the data obtained will be used."
        },
        {
          "title": "12. How will the participants be instructed?"
        },
        {
          "title": "13. Which questions will be asked to the participants?",
          "instruction": "Note that your questions should be aligned to the described goals above in order to maintain coherence"
        }
      ]
    },
    {
      "section": "Procedure",
      "key": "PR",
      "parentQuestions": [
        {
          "title": "18. How will the application be assessed?",
          "instruction": "A. To correctly fill in the assessment goals, it is not necessary to describe the goals pertaining to every usability attribute, but only to those that are relevant to the project.\nB. To assure the clarity and precision of the assessment goals descriptions, please consider whether they have been clearly stated with specific objectives.",
          "questions": [
            {
              "title": "18.1 When will it occur?"
            },
            {
              "title": "18.2 Where will it occur?"
            },
            {
              "title": "18.3 How will it occur?"
            },
            {
              "title": "18.4 How much time will it require?"
            }
          ]
        },
        {
          "title": "19. How will the design of the assessment be?",
          "instruction": "A. Name the possible steps.\nB. Detail the steps."
        },
        {
          "title": "20. Will the participants be able to ask questions during the assessment?"
        },
        {
          "title": "21. Will there be a pilot assessment?",
          "instruction": "If the answer is 'YES', describe how the pilot will be conducted.",
          "placeHolder": "Describe the pilot here"
        }
      ]
    },
    {
      "section": "Data collection and data analysis",
      "key": "DT",
      "parentQuestions": [
        {
          "title": "22. What will be the data collection procedure?",
          "placeHolder": "Describe the data collection procedure here"
        },
        {
          "title": "23. How will the data collected be analyzed?",
          "placeHolder": "Describe the procedure here"
        },
        {
          "title": "24. Will statistical methods be used?",
          "instruction": "If the answer is 'YES', describe the methods.",
          "placeHolder": "Describe the methods here"
        }
      ]
    },
    {
      "section": "Threats to validity",
      "key": "TH",
      "parentQuestions": [
        {
          "title": "25. Are there any threats to the validity of the assessment?",
          "questions": [
            {
              "title": "25.1 What are the threats to the validity of the assessment?",
              "placeHolder": "Describe the threats here"
            },
            {
              "title": "25.2 How will the threats to validity be controlled?",
              "placeHolder": "Describe how the threats wil be controlled here"
            },
            {
              "title": "25.3 Are there any limitations for the assessment?",
              "placeHolder": "Describe the limitations here"
            },
            {
              "title": "25.4 Are the ethical aspects of the assessment well defined for the participants?",
              "placeHolder": "Describe how the ethical aspects are defined here"
            },
            {
              "title": "25.5 What are the biases of the assessment, if any?",
              "placeHolder": "Describe the bias here"
            }
          ]
        }
      ]
    }
  ];

  static readonly REFERENCES: Array<any> = [
    {
      citation: "Wohlin 2012",
      work: "C. Wohlin, P. Runeson, M. Höst, M. C. Ohlsson, B. Regnell, and A. Wesslén. Experimentation in Software Engineering. Springer, 2012."
    },

    {
      citation: "Basili 1994",
      work: "V. R. Basili, G. Caldeira, and H. D. Rombach. The Goal Question Metric Approach. In Encyclopedia of Software Engineering, pages 1: 528– 532. John Wiley and Sons Inc., 1994."
    },

    {
      citation: "Easterbrook 2008",
      work: "S. Easterbrook, J. Singer, M. A. Storey, and D. Damian. Selecting Empirical Methods for Software Engineering Research. Springer, 2008."
    },

    {
      citation: "Dyba and Dingsoyr 2008",
      work: "T. Dybå and T. Dingsøyr, Strength of evidence in systematic reviews in software engineering, Proc. 2nd ACM/IEEE International Symposium on Empirical Software Engineering and Measurement (ESEM), 2008."
    },

    {
      citation: "CASP 2013",
      work: "PHRU, Critical appraisal skills programme. [online]. Available: http://media.wix.com/ugd/dded87_29c5b002d99342f788c6ac670e49f274.pdf"
    },

    {
      citation: "Vinson and Singer 2008",
      work: "N.G. Vinson and J. Singer. A practical guide to ethical research involving humans. Springer, 2008."
    },

    {
      citation: "Jedlitschka 2008",
      work: "A. Jedlitschka, M. Ciolkowski, and D. Pfahl. Reporting Experiments in Software Engineering, Guide to Advanced Empirical Software Eng., F. Shull, F, J. Singer, and D.I.K. Sjoberg, eds., Springer- 2008"
    },

    {
      citation: "Kitchenham 2009",
      work: "B.A. Kitchenham, O.P. Brereton, D. Budgen, and Z. Li, An evaluation of quality checklist proposals – A participant observer case study. EASE’09, BCS eWic, 2009."
    },

    {
      citation: "Ko 2015",
      work: "A. J. Ko, T. D. Latoza, and M. M. Burnett. A practical guide to controlled experiments of software engineering tools with human participants. Empirical Software Engineering. v. 20, n.1, p.110-141, 2015."
    },

    {
      citation: "Lazar 2010",
      work: "J. Lazar, JH Feng, H. Hochheiser, Research methods in human-computer interaction. Wiley, 2010."
    },

    {
      citation: "Jedlitschka 2008",
      work: "A. Jedlitschka, M. Ciolkowski, and D. Pfahl. Reporting Experiments in Software Engineering, Guide to Advanced Empirical Software Eng., F. Shull, F, J. Singer, and D.I.K. Sjoberg, eds., Springer- 2008."
    },

    {
      citation: "Montgomery 2013",
      work: "D.C. Montgomery, Design and Analysis of Experiments. eighth ed., John Wiley and Sons, 2013."
    },

    {
      citation: "Pfleeger 1995",
      work: "S. Pfleeger, Experimental design and analysis in software engineering, Annals of Software Engineering, vol. 1, no. 1, pp. 219–253, 1995."
    },

    {
      citation: "Ardelin Neto and Conte 2014",
      work: "A. Ardelin Neto and T.U Conte. Identifying Threats to Validity and Control Actions in the Planning Stages of Controlled Experiments. In: International Conference on Software Engineering and Knowledge Engineering (SEKE), 2014, Vancouver. Proceedings of the 26th International Conference on Software Engineering and Knowledge Engineering (SEKE 2014), 2014. p. 256-261."
    }
  ]

}
