var SurveyAppController = Backbone.Router.extend({

  initialize: function(params) {
    this.model = new SurveyAppModel();
    this.view = new SurveyAppView({ model : this.model });
    params.append_at.append(this.view.render().el);
  },


  routes: {
    "survey/next": "next",
    "survey/prev": "prev",
    "survey/submit": "submit"
  },


  // adds a SurveyItem object to the survey collection
  addItem : function(item) {
    app.model.survey.add(new SurveyItem(item));
  },

  // adds array of SurveyItem objects to the survey collection
  addItems : function(s) {
    _.each(s, function(item) {
      app.addItem(item);
    });
  },

  // returns current SurveyItem index
  getItemIndex : function() {
    return app.model.get("itemIndex");
  },

  // saves current user input
  setCurrentAnswer : function() {

    var ans = "";
    // get user input
    if ( $('textarea[name=essay]').length > 0 )
      ans = $('textarea[name=essay]').val();

    else if ( $('input:radio[name=multiple_choice]').length > 0 )
      ans = $('input:radio[name=multiple_choice]:checked').parent().index();

    else if ( $('input:radio[name=true_false]').length > 0 ) {
      ans = $('input:radio[name=true_false]:checked').parent().index();
      if (ans === 0)
        ans = true;
      else if (ans === 1)
        ans = false;
    }

    // check and set
    if (typeof ans != 'undefined' && ans !== "" && ans !== -1) {
      this.setAnswer(ans);
      console.log("setCurrentAnswer: " + ans);
    }
  },

  submit : function() {
    this.setCurrentAnswer();
    this.navigate()
    alert("Completed survey is here: app.model.survey.toJSON()");
  },

  // model methods wrappers
  // --------------------------------------------------------------------------- 
  setAnswer : function(ans) { app.model.setAnswer(ans); },

  next: function() {
    this.setCurrentAnswer();
    app.model.next()
    this.navigate()
  },
  prev: function() {
    this.setCurrentAnswer();
    app.model.prev()
    this.navigate()
  }

});
