SurveySpider -- Javascript MVC Survey
============

[Run SurveySpider -- online](http://sntx.github.com/SurveySpider/)



SurveySpider generates a survey from a JSON array of the form:

```html
<script>
surveyJSON = [

  { "type" : "ESSAY",
    "question" : "Which spider makes the largest web?" },

  { "type" : "MULTIPLE_CHOICE",
    "question" : "Which species of spiders see in color?",
    "answers" : ["Hobo spider",
                 "Black Widow Spider",
                 "Jumping spider",
                 "Daddy long legs"] },
    
  { "type" : "TRUE_FALSE",
    "question" : "Some spiders have wings" } ];
</script>
```


The completed survey can be accessed in JSON format with: app.model.survey.toJSON()
