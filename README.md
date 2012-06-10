SurveySpider -- Javascript MVC Survey
============

SurveySpider generates a survey from a JSON array of the form:


surveyJSON = [

  { "type" : "ESSAY",
    "question" : "What spider makes the largest web?" },

  { "type" : "MULTIPLE_CHOICE",
    "question" : "Which species of spider sees in color?",
    "answers" : ["Hobo spider",
                 "Black Widow Spider",
                 "Jumping spider",
                 "Daddy long legs"] },
    
  { "type" : "TRUE_FALSE",
    "question" : "Some spiders have wings" } ];


The completed survey can be accessed in JSON format with: app.model.survey.toJSON()
