var nodemailer = require( "nodemailer" );
var transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: <string>,
		pass: <string>
	}
});

var _ = require( "lodash" );
var util = require( "util" );

function Member ( params ) {

	this.name = params.name;
	this.email = params.email;
	
	if ( params.previousAssignment ) {
		this.previousAssignment = params.previousAssignment;
	}
	
	this.assignment;

}

function MemberPool() {

	this.members = [];

}

MemberPool.prototype.addMember = function ( params ) {

	this.members.push( new Member( params ) );

};

MemberPool.prototype.email = function ( member ) {
	
	
	transporter.sendMail({
		from: <string>,
		to: member.email,
		subject: <string>,
		text: "Hey! You have " + member.assignment.name
	});

};

MemberPool.prototype.assign = function () {
	
	var memberIds = _.keys( this.members ).map( Number );

	this.members.forEach( function ( member, index ) {
		
		var prevAssignmentId = _.findIndex( this.members, { name: member.previousAssignment } );
		var possibleAssignments = _.without( memberIds, index, prevAssignmentId );
		var assignmentId = _.sample( possibleAssignments )
		member.assignment = this.members[assignmentId];
		
		_.pull( memberIds, assignmentId );

		this.email( member );

	}, this );

};

var memberPool = new MemberPool();

memberPool.addMember({
	 name: {<string> name},
	 email: {<string> email address},
	 previousAssignment: {<string> name field from previous time}
});

memberPool.assign();
