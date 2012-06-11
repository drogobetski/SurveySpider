/*
    SurveySpider -- Easy to set up survey generator web app
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


// TODO: Inherit from MultipleChoice, TrueFalse or Essay models ???

// TODO: in validate(): change undefined check for a null check and add defaults 
//       member to SurveyItem

var SurveyItem = Backbone.Model.extend({

  // TODO: validate on initialize()

  validate : function(attrs) {

    if (typeof attrs.type == "undefined") {
      return "SurveyItem.type must be set before any other attribute";
    }
    else {

      // question: string with length >= 0
      if (typeof attrs.question != "undefined") {
        if (!_.isString(attrs.question) || attrs.question.length < 10) {
          return "SurveyItem.question must be a string with length >= 10";
        }
      }

      // MULTIPLE_CHOICE ------------------------------------------------------- 
      //
      //    answers: array.lenght must be > 1
      //    answer:  valid answers array index
      //
      if (attrs.type == "MULTIPLE_CHOICE") {
        if (typeof attrs.answers != "undefined") {

          if (!_.isArray(attrs.answers) || attrs.answers.length < 2) {
            return "SurveyItem.answers must be an array of length > 1";
          }

          if (typeof attrs.answer != "undefined") {

            if (!_.isNumber(attrs.answer)
                || attrs.answer < 0
                || attrs.answer >= attrs.answers.length
                || (attrs.answer - parseInt(attrs.answer)) > 0 ) {
              return "SurveyItem.answer must be an integer from 0 to "
                     + "answers.length - 1";
            }
          }
        }
        else return "SurveyItem.answers must be included";
      }

      // TRUE_FALSE ------------------------------------------------------------ 
      //
      //    answer: boolean value
      //
      else if (attrs.type == "TRUE_FALSE") {
        if (typeof attrs.answer != "undefined") {
          if (!_.isBoolean(attrs.answer)) {
            return "SurveyItem.answer must be a boolean value";
          }
        }
      }

      // ESSAY ----------------------------------------------------------------- 
      //
      //    answer: string with length >= 0
      //
      else if (attrs.type == "ESSAY") {
        if (typeof attrs.answer != "undefined") {
          if (!_.isString(attrs.answer) || attrs.answer.length < 1) {
            return "SurveyItem.answer must be a string with length >= 1";
          }
        }
      }

      // INVALID SurveyItem.type ---------------------------------------------- 
      else return "SurveyItem.type must be 'ESSAY', 'MULTIPLE_CHOICE' or "
                  + "'TRUE_FALSE'";

    }
  }
});


var SurveyItemCollection = Backbone.Collection.extend({
  model: SurveyItem
});


// Keeps track of one item inside a SurveyItemCollection and provides methods to 
// access and manipulate it.
var SurveyAppModel = Backbone.Model.extend({

  // TODO: should I get rid of initialize? and use attributes insted?
  initialize: function() {
    this.survey = new SurveyItemCollection();
  },

  defaults : {
    // index of current item in this.survey
    // -1 implies that no items have been visited yet.
    "itemIndex" : -1
  },


  validate : function(attrs) {

    // itemIndex is a number and a valid index of this.survey
    if (_.isNumber(attrs.itemIndex) && this.survey.length > 0) {
      if (attrs.itemIndex < 0 || attrs.itemIndex > this.survey.length - 1) {
        return "SurveyItemCollection.itemIndex out of range";
      }
    }

    // itemIndex is not a number
    else if (!_.isNumber(attrs.itemIndex)) {
      return "SurveyItemCollection.itemIndex must be a number";
    }
  },


  // navigate the SurveyItemCollection
  // --------------------------------------------------------------------------- 
  next: function() {
    var i = this.get("itemIndex");
    if (i < this.survey.length - 1)
      this.set({ itemIndex : ++i });
  },
  prev: function() {
    var i = this.get("itemIndex");
    if (i > 0)
      this.set({ itemIndex : --i });
  },


  // access and manipulate current item
  // --------------------------------------------------------------------------- 
  setAnswer : function(ans) {
    // set answer and trigger setAnswer event
    //this.survey.models[this.get("itemIndex")].set({ answer : ans });
    this.getItem().set({ answer : ans });
    this.trigger('setAnswer');
  },
  getAnswer : function() {
    return this.survey.models[this.get("itemIndex")].attributes.answer;
  },
  getItem : function() {
    // only return something if a current item has been set
    if (this.get("itemIndex") >= 0)
      return this.survey.models[this.get("itemIndex")];
  },
  getItemType : function() {
    // only return something if a current item has been set
    if (this.get("itemIndex") >= 0)
      return this.getItem().get("type");
  },

});
