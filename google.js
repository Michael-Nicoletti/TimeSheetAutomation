var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');

// spreadsheet key is the long id in the sheets URL
var doc = new GoogleSpreadsheet('<INSERT SPREADSHEET HERE>');
const refSheetName = "Range Sheet";   //Easy to set ref sheet, we can probably even set this in an options screen to be honest.

var refSheet;                       //We need access to the sheet that has all of the project, platform and team data on it
var projects = new Array(1);        //An array of all the projects that the team is currently working on
var teams = new Array(1);           //An array of the teams that are available
var plats = new Array(1);

var initialized = false;						//We need to wait for this to be true before we actually start up the app. For now its going to remain here as a reminder of future!
 
async.series([
	function setAuth(step) {
		// see notes below for authentication instructions!
		var creds = require('./JSON/<INSERT CREDS HERE>');
 
		doc.useServiceAccountAuth(creds, step);
	},
	function getRefData(step) {
		doc.getInfo(function(err, info) {
			for(var i = 0; i < info.worksheets.length; i++) {
				if(info.worksheets[i].title == refSheetName) { 
					refSheet = info.worksheets[i];
				}
			}
			if(refSheet!==null) {
				refSheet.getCells({
					'min-row': 2,
					'max-row': 15,
					'min-col': 1,
					'max-col': 1,
					'return-empty':false
				}, function (err, cells) {
					cells.forEach(function(cell) {
						console.log(cell.value);
						projects.push(cell.value);
					});
					projects.shift();
				})

				refSheet.getCells({
					'min-row': 2,
					'max-row': 15,
					'min-col': 2,
					'max-col': 2,
					'return-empty':false
				}, function (err, cells) {
					cells.forEach(function(cell) {
						console.log(cell.value);
						plats.push(cell.value);
					});
					plats.shift();
				})

				refSheet.getCells({
					'min-row': 2,
					'max-row': 15,
					'min-col': 3,
					'max-col': 3,
					'return-empty':false
				}, function (err, cells) {
					cells.forEach(function(cell) {
						teams.push(cell.value);
					});
					teams.shift();
				})
			}
		})
	 }
	], function(err){
			if( err ) {
				console.log('Error: '+err);
			}
});

function GetProjectsList(){
	console.log(projects);
	return projects;
}

function GetPlatformsList(){
	console.log(plats);
	return plats;
}

function GetTeamsList(){
	console.log(teams);
	return teams;
}