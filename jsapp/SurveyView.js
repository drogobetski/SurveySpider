/*
    SurveySpider -- jQueryUI Survey System
    Copyright (C) 2012 Santiago Ferreira

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

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
      +'  <div class="title ui-widget-header ui-corner-all">'
      +'    <span class="progress">({{ progress }})</span>'
      +'    <span class="question">{{ question }}</span>'
      +'  </div>'
      +'    <div class="answer {{ type }} ui-widget-content ui-corner-all">';


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

        template += '<div class="radio-item">'
                 +  '  <input type=radio'
                 +  '         name="multiple_choice"'
                 +  '         value="' + ans + '"';

        // TODO: checked not working !!!
        if (key === checkedIndex)
          template += ' checked';

        template += '/><span class="label">' + ans
                 +  '</span>' + '</div>';
      });
    }
    else if (this.model.get("type") === "TRUE_FALSE") {

      // determine if a radio button is checked
      var checkedIndex = this.model.get("answer");
      var trueCheck = "";
      var falseCheck = "";

      if (typeof checkedIndex !== 'undefined') {
        if (checkedIndex === true)
          trueCheck = "checked";
        else if (checkedIndex === false)
          falseCheck = "checked";
      }

      // True radio button
      template += '<div class="radio-item">'
               +  '  <input type=radio name="true_false" value="True"'
               +            trueCheck + '/>'
               +  '  <span class="label">True</span>'
               +  '</div>';
      // False radio button
      template += '<div class="radio-item">'
               +  '  <input type=radio name="true_false" value="False"'
               +            falseCheck + '/>'
               +  '  <span class="label">False</span>'
               +  '</div>';
    }
    template += '</div></div>';


    // BUTTONS ----------------------------------------------------------------- 
    //
    template += '<div class="buttons ui-helper-clearfix ">';

    // first item
    if (itemNum === 1) {
      template += '<a class="button next" href="#survey/next">next</a>';
    }
    // last item
    else if (itemNum === numItems) {
      template += '<a class="button submit" href="#survey/submit">submit</a>'
               +  '<a class="button prev" href="#survey/prev">prev</a>';
    }
    // middle item
    else {
      template += '<a class="button next" href="#survey/next">next</a>'
               +  '<a class="button prev" href="#survey/prev">prev</a>';
    }
    template += '</div>';


    // GENERATE HTML ----------------------------------------------------------- 
    //
    var context = _.extend(this.model.toJSON(),
                           { cid : this.model.cid,
                             progress : progress });

    $(this.el).html(Mustache.to_html(template, context));

    // apply jQueryUI
    $(this.el).find('a').button();
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
    var template = '<div class="item"></div>';

    var context = this.model.toJSON();
    $(this.el).html(Mustache.to_html(template, context));
    $(this.el).attr("id", "survey");
    $(this.el).attr("class", "ui-widget ui-widget-content ui-corner-all");

    this.currentSurveyItem = this.$('.item');
    return this;
  },

});
