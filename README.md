SurveySpider -- jQueryUI Survey System
======================================

[Run SurveySpider](http://sntx.github.com/SurveySpider/)


Features

  - Easy to set up: reads JSON array and automatically generates a survey page
  - jQueryUI themes: just change the jQueryUI theme to modify the look of the page
  - AJAX ready: just get the completed survey in JSON format and use it in your server-side application


Instructions
============

(1) Initialize App and append main div to an element in your page

```html
<script>
  var surveyApp = new SurveyAppController({ append_at : $('#survey-wrapper') });
  window.app = surveyApp;
  Backbone.history.start();
</script>
```


(2) Get survey in JSON format:

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

(3) Add survey items by usign app.addItems(surveyJSON) or:

```html
<script>
  app.addItem( { "type" : "TRUE_FALSE",
                 "question" : "Some spiders have wings" } );
</script>
```

(4) call app.next() for survey to begin

(5) Get the completed survey by running: app.model.survey.toJSON()
