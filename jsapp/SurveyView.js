var SurveyView = Backbone.View.extend({
  initialize : function(args) {
    // TODO: bindings
  },

  render : function() {

    // QUESTION ---------------------------------------------------------------- 
    //
    var itemNum = 1 + _.indexOf(this.model.collection.models, this.model);
    var numItems = this.model.collection.models.length;
    var progress = itemNum + "/" + numItems;

    var template =
       '<div id="item_{{ cid }}">'
      +'  <span class="progress">{{ progress }}</span>'
      +'  <span class="question">{{ question }}</span>'
      +'  <div class="answer {{ type }}">';


    // ANSWER -- ESSAY, MULTIPLE_CHOICE or TRUE_FALSE --------------------------
    //
    if (this.model.get("type") === "ESSAY") {
      template += '<textarea name="essay">{{ answer }}</textarea>';
    }
    else if (this.model.get("type") === "MULTIPLE_CHOICE") {

      // TODO: generate radio buttons using Mustache

      // determine if a radio button is checked
      var checkedIndex = this.model.get("answer");
      if (typeof checkedIndex === 'undefined')
        checkedIndex = -1;

      _.each(this.model.get("answers"), function(ans, key) {

        template += '<input type=radio'
                 +  '       name="multiple_choice"'
                 +  '       value="' + ans + '"';

        if (key === checkedIndex)
          template += ' checked';

        template += '/>' + ans;
      });
    }
    else if (this.model.get("type") === "TRUE_FALSE") {

      // determine if a radio button is checked
      var checkedIndex = this.model.get("answer");
      console.log("TRUE_FALSE " + checkedIndex);

      if (typeof checkedIndex === 'undefined')
        template += '<input type=radio name="true_false"/>True'
                 +  '<input type=radio name="true_false"/>False';
      else if (checkedIndex === true)
        template += '<input type=radio name="true_false" checked/>True'
                 +  '<input type=radio name="true_false"/>False';
      else if (checkedIndex === false)
        template += '<input type=radio name="true_false"/>True'
                 +  '<input type=radio name="true_false" checked/>False';
    }
    template += '</div></div>';


    // BUTTONS ----------------------------------------------------------------- 
    //
    template += '<div class="buttons">';

    // first item
    if (itemNum === 1) {
      template += '<a class="next" href="#survey/next">next</a>';
    }
    // last item
    else if (itemNum === numItems) {
      template += '<a class="prev" href="#survey/prev">prev</a>'
               +  '<a class="submit" href="#survey/submit">submit</a>';
    }
    // middle item
    else {
      template += '<a class="prev" href="#survey/prev">prev</a>'
               +  '<a class="next" href="#survey/next">next</a>';
    }
    template += '</div>';


    // GENERATE HTML ----------------------------------------------------------- 
    //
    var context = _.extend(this.model.toJSON(),
                           { cid : this.model.cid,
                             progress : progress });

    $(this.el).html(Mustache.to_html(template, context));
    return this;
  }
});

var SurveyAppView = Backbone.View.extend({

  initialize : function() {

    _.bindAll(this, "changeItem", "setAnswer");

    this.model.bind('change:itemIndex', this.changeItem);
    this.model.bind('setAnswer', this.setAnswer);
  },


  // NOTE: m is this.model
  changeItem : function(m) {

    // get reference to current SurveyItem and create a view for it
    var view = new SurveyView({ model : m.getItem() });

    // replace current survey item
    this.currentSurveyItem.children().remove();
    this.currentSurveyItem.append(view.render().el);
  },

  setAnswer : function() {
    //console.log("SurveyAppView.setAnswer()");
    //console.log( this.model.getItem().get("answer") );
  },


  render : function() {
    console.log("SurveyAppView.render()");

    var template = '<div class="item"></div>';

    var context = this.model.toJSON();
    $(this.el).attr("id", "survey");
    $(this.el).html(Mustache.to_html(template, context));

    this.currentSurveyItem = this.$('.item');
    return this;
  },

});
