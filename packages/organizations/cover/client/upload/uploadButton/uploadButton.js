/* Copyright 2017 Apinf Oy
This file is covered by the EUPL license.
You may obtain a copy of the licence at
https://joinup.ec.europa.eu/community/eupl/og_page/european-union-public-licence-eupl-v11 */

// Meteor packages imports
import { Template } from 'meteor/templating';

// Collection imports
import OrganizationCover from '/packages/organizations/cover/collection/collection';

Template.uploadOrganizationCoverButton.onRendered(() => {
  // Assign resumable browse to element
  OrganizationCover.resumable.assignBrowse($('.fileBrowse-cover'));
});
