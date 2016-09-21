import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template.viewApiPageHeader.onCreated(function () {
  // Get reference to template instance
  const instance = this;

  // Create variable to track tour status
  instance.userShouldSeeIntro = new ReactiveVar();
});

Template.viewApiPageHeader.helpers({
  userShouldSeeIntro () {
    // Get reference to template instance
    const instance = Template.instance();

    // Get value of tour status reactive variable
    const userShouldSeeIntro = instance.userShouldSeeIntro.get();

    return userShouldSeeIntro;
  },
});

Template.viewApiPageHeader.events({
  'click #api-intro': function (event, templateInstance) {
    // Update user tour status reactive variable
    templateInstance.userShouldSeeIntro.set(true);
  },
});
