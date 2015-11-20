var nodemailer = require( 'nodemailer' );
var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: '',
		pass: ''
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
		from: '',
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

memberPool.addMember( 'name', 'email' );

memberPool.assign();
