var nodemailer = require( 'nodemailer' );
var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'jdoodlesack@gmail.com',
		pass: 'lithos'
	}
});

var _ = require( 'lodash' );
var util = require( 'util' );

function Member ( name, email ) {

	this.name = name;
	this.email = email;
	this.assignment;

}

function MemberPool() {

	this.members = [];

}

MemberPool.prototype.addMember = function ( name, email ) {

	this.members.push( new Member( name, email ) );

};

MemberPool.prototype.shuffle = function () {

	this.members = _.shuffle( this.members );

};

MemberPool.prototype.email = function ( member ) {

	transporter.sendMail({
		from: 'jdoodlesack@gmail.com',
		to: member.email,
		subject: 'Christmas Exchange Assignment - DO NOT REPLY!',
		text: 'Hey! You have ' + this.members[member.assignment].name
	});

};

MemberPool.prototype.assign = function () {

	this.shuffle();

	this.members.forEach( function ( member, index ) {

		if ( index !== ( this.members.length - 1 ) ) {

			member.assignment = index+1;

		} else member.assignment = 0;

		this.email( member );

	}, this );

};

var memberPool = new MemberPool();

memberPool.addMember( 'Ian', 'lamont.ibrow@gmail.com' );
memberPool.addMember( 'Jacob', 'cob@jacoblamont.com' );
memberPool.addMember( 'Hannah', 'hmlamont@gmail.com' );
memberPool.addMember( 'Mom', 'glamont@stny.rr.com' );
memberPool.addMember( 'Dad', 'lamont.pensels@gmail.com' );

memberPool.assign();
