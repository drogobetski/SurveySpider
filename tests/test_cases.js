function AssertException(message) { this.message = message; }
AssertException.prototype.toString = function () {
  return 'AssertException: ' + this.message;
}

function assert(exp, message) {
  if (!exp) {
    throw new AssertException(message);
  }
}


function runTestCases() {

// ----------------------------------------------------------------------------- 
// TEST -- model validate()
// ----------------------------------------------------------------------------- 
console.log("TEST -- model validate()");

// TRUE_FALSE
// ----------------------------------------------------------------------------- 
var tf = new SurveyItem();

// valid
assert( tf.set({ type : "TRUE_FALSE", question : "Is this a question?" }) );
assert( tf.set({ answer : true }) );
assert( tf.set({ answer : false }) );
// invalid
assert( !tf.set({ answer : 0 }) );
assert( !tf.set({ answer : 1 }) );
assert( !tf.set({ answer : "false" }) );



// ESSAY
// ----------------------------------------------------------------------------- 
var essay = new SurveyItem();

// valid
assert( essay.set({ type : "ESSAY", question : "How are you?" }) );
assert( essay.set({ answer : "good" }) );

// invalid
assert( !essay.set({ answer : 0 }) );
assert( !essay.set({ answer : ["good"] }) );
assert( !essay.set({ answer : "" }) );



// MULTIPLE_CHOICE
// ----------------------------------------------------------------------------- 
var mc = new SurveyItem();

// valid
assert( mc.set({ type : "MULTIPLE_CHOICE",
                 question : "What's your favorite RGB?",
                 answers : ["red", "green", "blue"] }) );

assert( mc.set({ answer : 0 }) );
assert( mc.set({ answer : 1 }) );
assert( mc.set({ answer : 2 }) );

// invalid
assert( !mc.set({ answer : 1.1 }) );
assert( !mc.set({ answer : -1 }) );
assert( !mc.set({ answer : 3 }) );
assert( !mc.set({ answer : "1" }) );




// ----------------------------------------------------------------------------- 
// TEST -- SurveyAppController() - model insertion and manipulation
// ----------------------------------------------------------------------------- 
console.log("TEST -- SurveyAppController() - model manipulation");

  surveyJSON = [

    { "type" : "ESSAY",
      "question" : "Write about something" },

    { "type" : "MULTIPLE_CHOICE",
      "question" : "Favorite RGB",
      "answers" : ["red", "green", "blue"] },

    { "type" : "TRUE_FALSE",
      "question" : "Is this a question?" } ];
                   
  app.addItems(surveyJSON);
  assert( app.getItemIndex() == -1 );

  app.next();
  assert( app.getItemIndex() == 0 );
  /*
  app.next();
  assert( app.getItemIndex() == 1 );
  app.next();
  assert( app.getItemIndex() == 2 );
  app.next();
  assert( app.getItemIndex() == 2 );

  app.prev();
  assert( app.getItemIndex() == 1 );
  app.prev();
  assert( app.getItemIndex() == 0 );
  app.prev();
  assert( app.getItemIndex() == 0 );

  app.setAnswer("I'm writing about something");
  assert (app.model.getAnswer() === "I'm writing about something");

  app.next();
  app.setAnswer(0);
  assert( app.getItemIndex() == 1 );
  assert (app.model.getAnswer() === 0);
  */

}
