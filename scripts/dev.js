var ONE = NumberInt(1);
var YEAR = NumberInt(2013);
var JANUARY_JS = NumberInt(0);
var FEBRUARY_JS = NumberInt(1);
var MARCH_JS = NumberInt(2);
var APRIL_JS = NumberInt(3);
var MAY_JS = NumberInt(4);
var JUNE_JS = NumberInt(5);
var JULY_JS = NumberInt(6);
var AUGUST_JS = NumberInt(7);
var SEPTEMBER_JS = NumberInt(8);
var OCTOBER_JS = NumberInt(9);
var NOVEMBER_JS = NumberInt(10);
var DECEMBER_JS = NumberInt(11);

var JANUARY = NumberInt(1);
var FEBRUARY = NumberInt(2);
var MARCH = NumberInt(3);
var APRIL = NumberInt(4);
var MAY = NumberInt(5);
var JUNE = NumberInt(6);
var JULY = NumberInt(7);
var AUGUST = NumberInt(8);
var SEPTEMBER = NumberInt(9);
var OCTOBER = NumberInt(10);
var NOVEMBER = NumberInt(11);
var DECEMBER = NumberInt(12);

db.Absence.drop();
db.Claim.drop();
db.Cra.drop();
db.Customer.drop();
db.Day.drop();
db.HalfDay.drop();
db.Mission.drop();
db.PartTime.drop();
db.Parameter.drop();
db.User.drop();
db.Vehicle.drop();
db.fs.files.drop();
db.fs.chunks.drop();
/**
 * Parameter
 */
db.Parameter.insert({
	_startDate: new Date(YEAR, JANUARY_JS, 1),
	active: true,
	_car: {
		0: '0.1',
		5: '5.5',
		8: '8.8',
		11: '11'
	},
	_motorcycle: {
		"0": "1.1",
		"501": "5.01"
	},
	_zoneAmount: '4.70'
});
/**
 * Customer
 * */
db.Customer.insert({code: 'GG', name: 'Genesis', isGenesis: true });
db.Customer.insert({code: 'CODE_C_1', name: 'Client 1', isGenesis: false});
db.Customer.insert({code: 'CODE_C_2', name: 'Client 2', isGenesis: false});
db.Customer.insert({code: 'CODE_C_3', name: 'Client 3', isGenesis: false});
var genesis = db.Customer.findOne({isGenesis: true});
var customer1 = db.Customer.findOne({code: 'CODE_C_1'});
var customer2 = db.Customer.findOne({code: 'CODE_C_2'});
var customer3 = db.Customer.findOne({code: 'CODE_C_3'});

/*
 * Mission
 */
db.Mission.insert({customerId: customer1._id, code: 'C1_M1 (REAL)', label: "Cli 1 Mis 1 (réel)", description: 'Description de la mission...', allowanceType: 'REAL', _distance: '43', missionType: 'customer', isClaimable: true, _startDate: new Date(YEAR, JANUARY_JS, ONE), _endDate: new Date(YEAR, APRIL_JS, NumberInt(30))});
db.Mission.insert({customerId: customer1._id, code: 'C1_M2 (ZONE)', label: "Cli 1 Mis 2 (Zone)", description: 'Description de la mission...', allowanceType: 'ZONE', missionType: 'customer', isClaimable: true, _startDate: new Date(YEAR, FEBRUARY_JS, ONE), _endDate: new Date(YEAR, DECEMBER_JS, NumberInt(31))});
db.Mission.insert({customerId: customer2._id, code: 'C2_M1 (REAL)', label: "Cli 2 Mis 1 (Réel)", description: 'Description de la mission...', allowanceType: 'REAL', _distance: '72', missionType: 'customer', isClaimable: true, _startDate: new Date(YEAR, FEBRUARY_JS, ONE), _endDate: new Date(YEAR, APRIL_JS, NumberInt(30))});
db.Mission.insert({customerId: customer3._id, code: 'C3_M1 (ZONE)', label: "Cli 3 Mis 1 (Zone)", description: 'Description de la mission...', allowanceType: 'ZONE', missionType: 'customer', isClaimable: true, _startDate: new Date(YEAR, MARCH_JS, ONE), _endDate: new Date(YEAR, NOVEMBER_JS, NumberInt(30))});
db.Mission.insert({customerId: genesis._id, code: 'AV', label: 'Avant vente', allowanceType: 'NONE', missionType: 'pre_sale', isClaimable: true, _startDate: new Date(YEAR, JANUARY_JS, ONE)});
db.Mission.insert({customerId: genesis._id, code: 'CP', label: 'Congé payé', allowanceType: 'NONE', missionType: 'holiday', absenceType: 'CP', _startDate: new Date(YEAR, JANUARY_JS, ONE) });
db.Mission.insert({customerId: genesis._id, code: 'RTTE', label: 'RTT Employeur', allowanceType: 'NONE', missionType: 'holiday', absenceType: 'RTT', _startDate: new Date(YEAR, JANUARY_JS, ONE) });
db.Mission.insert({customerId: genesis._id, code: 'RTTS', label: 'RTT Salarié', allowanceType: 'NONE', missionType: 'holiday', absenceType: 'RTT', _startDate: new Date(YEAR, JANUARY_JS, ONE) });
db.Mission.insert({customerId: genesis._id, code: 'AE', label: 'Absence exceptionnelle', allowanceType: 'NONE', missionType: 'holiday', absenceType: 'CP', _startDate: new Date(YEAR, JANUARY_JS, ONE) });
db.Mission.insert({customerId: genesis._id, code: 'TP', label: 'Temps partiel', allowanceType: 'NONE', missionType: 'not_paid', _startDate: new Date(YEAR, JANUARY_JS, 1)});
db.Mission.insert({customerId: genesis._id, code: 'F', label: 'Formation', allowanceType: 'NONE', missionType: 'internal_work', isClaimable: true, _startDate: new Date(YEAR, JANUARY_JS, 1)});
db.Mission.insert({customerId: genesis._id, code: 'TI', label: 'Travaux interne', allowanceType: 'NONE', missionType: 'internal_work', isClaimable: true, _startDate: new Date(YEAR, JANUARY_JS, 1)});
db.Mission.insert({customerId: genesis._id, code: 'IC', label: 'Inter-contrat', allowanceType: 'NONE', missionType: 'internal_work', isClaimable: false, _startDate: new Date(YEAR, JANUARY_JS, 1)});
var mission1_customer1 = db.Mission.findOne({customerId: customer1._id, code: 'C1_M1 (REAL)'});
var mission2_customer1 = db.Mission.findOne({customerId: customer1._id, code: 'C1_M2 (ZONE)'});
var mission1_customer2 = db.Mission.findOne({customerId: customer2._id, code: 'C2_M1 (REAL)'});
var mission1_customer3 = db.Mission.findOne({customerId: customer3._id, code: 'C3_M1 (ZONE)'});
var pre_sale = db.Mission.findOne({customerId: genesis._id, missionType: 'pre_sale' });
var holiday = db.Mission.findOne({customerId: genesis._id, code: 'CP', missionType: 'holiday'});
var rtte = db.Mission.findOne({customerId: genesis._id, code: 'RTTE', missionType: 'holiday'});
var rtts = db.Mission.findOne({customerId: genesis._id, code: 'RTTS', missionType: 'holiday'});
var ae = db.Mission.findOne({customerId: genesis._id, code: 'AE', missionType: 'holiday'});
var part_time = db.Mission.findOne({customerId: genesis._id, code: 'TP', missionType: 'not_paid' });
var formation = db.Mission.findOne({customerId: genesis._id, code: 'F', missionType: 'internal_work' });
var internal_work = db.Mission.findOne({customerId: genesis._id, code: 'TI', missionType: 'internal_work' });
var inter_contrat = db.Mission.findOne({customerId: genesis._id, code: 'IC', missionType: 'internal_work' });

/*
 * User
 */
db.User.insert({username: 'lisa', password: '7RT0pNfs3bba6OVJADALHg==', role: 'admin', firstName: 'lisa', lastName: 'Simpson', trigramme: 'LSN', email: 'lisa@simpson.com'});
db.User.insert({username: 'bart-tpl1', password: 'UPqEsTqdRcMBOzNzAu/+3A==', role: 'employee', firstName: 'bart', lastName: 'Simpson Temps Pleins 1', trigramme: 'BSN', email: 'bart@simpson.com',
	affectedMissions: [
		{_startDate: mission1_customer1._startDate, _endDate: mission1_customer1._endDate, missionId: mission1_customer1._id},
		{_startDate: mission2_customer1._startDate, _endDate: mission2_customer1._endDate, missionId: mission2_customer1._id},
		{_startDate: pre_sale._startDate, _endDate: pre_sale._endDate, missionId: pre_sale._id},
		{_startDate: holiday._startDate, _endDate: holiday._endDate, missionId: holiday._id},
		{_startDate: rtte._startDate, _endDate: rtte._endDate, missionId: rtte._id},
		{_startDate: rtts._startDate, _endDate: rtts._endDate, missionId: rtts._id},
		{_startDate: ae._startDate, _endDate: ae._endDate, missionId: ae._id},
		{_startDate: part_time._startDate, _endDate: part_time._endDate, missionId: part_time._id},
		{_startDate: formation._startDate, _endDate: formation._endDate, missionId: formation._id},
		{_startDate: internal_work._startDate, _endDate: internal_work._endDate, missionId: internal_work._id},
		{_startDate: inter_contrat._startDate, _endDate: inter_contrat._endDate, missionId: inter_contrat._id}
	]});
db.User.insert({username: 'bart-tpl2', password: 'ivRfEpsPVrTmmYMZp3R2jw==', role: 'employee', firstName: 'bart', lastName: 'Simpson Temps Pleins 2', trigramme: 'BSN', email: 'bart@simpson.com',
	affectedMissions: [
		{_startDate: mission1_customer1._startDate, _endDate: mission1_customer1._endDate, missionId: mission1_customer1._id},
		{_startDate: mission2_customer1._startDate, _endDate: mission2_customer1._endDate, missionId: mission2_customer1._id},
		{_startDate: pre_sale._startDate, _endDate: pre_sale._endDate, missionId: pre_sale._id},
		{_startDate: holiday._startDate, _endDate: holiday._endDate, missionId: holiday._id},
		{_startDate: rtte._startDate, _endDate: rtte._endDate, missionId: rtte._id},
		{_startDate: rtts._startDate, _endDate: rtts._endDate, missionId: rtts._id},
		{_startDate: ae._startDate, _endDate: ae._endDate, missionId: ae._id},
		{_startDate: part_time._startDate, _endDate: part_time._endDate, missionId: part_time._id},
		{_startDate: formation._startDate, _endDate: formation._endDate, missionId: formation._id},
		{_startDate: internal_work._startDate, _endDate: internal_work._endDate, missionId: internal_work._id},
		{_startDate: inter_contrat._startDate, _endDate: inter_contrat._endDate, missionId: inter_contrat._id}
	]});
db.User.insert({username: 'bart-tpa1', password: '2rB/O7F/etPodCrKvO1AWg==', role: 'employee', firstName: 'bart', lastName: 'Simpson Temps Partiel 1', trigramme: 'BSN', email: 'bart@simpson.com',
	affectedMissions: [
		{_startDate: mission1_customer1._startDate, _endDate: mission1_customer1._endDate, missionId: mission1_customer1._id},
		{_startDate: mission2_customer1._startDate, _endDate: mission2_customer1._endDate, missionId: mission2_customer1._id},
		{_startDate: pre_sale._startDate, _endDate: pre_sale._endDate, missionId: pre_sale._id},
		{_startDate: holiday._startDate, _endDate: holiday._endDate, missionId: holiday._id},
		{_startDate: rtte._startDate, _endDate: rtte._endDate, missionId: rtte._id},
		{_startDate: rtts._startDate, _endDate: rtts._endDate, missionId: rtts._id},
		{_startDate: ae._startDate, _endDate: ae._endDate, missionId: ae._id},
		{_startDate: part_time._startDate, _endDate: part_time._endDate, missionId: part_time._id},
		{_startDate: formation._startDate, _endDate: formation._endDate, missionId: formation._id},
		{_startDate: internal_work._startDate, _endDate: internal_work._endDate, missionId: internal_work._id},
		{_startDate: inter_contrat._startDate, _endDate: inter_contrat._endDate, missionId: inter_contrat._id}
	]});
db.User.insert({username: 'bart-tpa2', password: 'VP93vlWN1p2qcLVYq/hvXw==', role: 'employee', firstName: 'bart', lastName: 'Simpson Temps Partiel 2', trigramme: 'BSN', email: 'bart@simpson.com',
	affectedMissions: [
		{_startDate: mission1_customer1._startDate, _endDate: mission1_customer1._endDate, missionId: mission1_customer1._id},
		{_startDate: mission2_customer1._startDate, _endDate: mission2_customer1._endDate, missionId: mission2_customer1._id},
		{_startDate: pre_sale._startDate, _endDate: pre_sale._endDate, missionId: pre_sale._id},
		{_startDate: holiday._startDate, _endDate: holiday._endDate, missionId: holiday._id},
		{_startDate: rtte._startDate, _endDate: rtte._endDate, missionId: rtte._id},
		{_startDate: rtts._startDate, _endDate: rtts._endDate, missionId: rtts._id},
		{_startDate: ae._startDate, _endDate: ae._endDate, missionId: ae._id},
		{_startDate: part_time._startDate, _endDate: part_time._endDate, missionId: part_time._id},
		{_startDate: formation._startDate, _endDate: formation._endDate, missionId: formation._id},
		{_startDate: internal_work._startDate, _endDate: internal_work._endDate, missionId: internal_work._id},
		{_startDate: inter_contrat._startDate, _endDate: inter_contrat._endDate, missionId: inter_contrat._id}
	]});
db.User.insert({username: 'moe', password: 'fzMzTUwvbdb/xwGUTOwvHA==', role: 'employee', firstName: 'Moe', lastName: 'Szyslak', trigramme: 'MSK', email: 'moe@szyslak.com',
	affectedMissions: [
		{_startDate: mission1_customer2._startDate, _endDate: mission1_customer2._endDate, missionId: mission1_customer2._id},
		{_startDate: mission1_customer3._startDate, _endDate: mission1_customer3._endDate, missionId: mission1_customer3._id},
		{_startDate: pre_sale._startDate, _endDate: pre_sale._endDate, missionId: pre_sale._id},
		{_startDate: holiday._startDate, _endDate: holiday._endDate, missionId: holiday._id},
		{_startDate: rtte._startDate, _endDate: rtte._endDate, missionId: rtte._id},
		{_startDate: rtts._startDate, _endDate: rtts._endDate, missionId: rtts._id},
		{_startDate: ae._startDate, _endDate: ae._endDate, missionId: ae._id},
		{_startDate: part_time._startDate, _endDate: part_time._endDate, missionId: part_time._id},
		{_startDate: formation._startDate, _endDate: formation._endDate, missionId: formation._id},
		{_startDate: internal_work._startDate, _endDate: internal_work._endDate, missionId: internal_work._id},
		{_startDate: inter_contrat._startDate, _endDate: inter_contrat._endDate, missionId: inter_contrat._id}
	]});
db.User.insert({username: 'moe-tpl1', password: 'lBfPWQj8f3NeGIa3B5+SWw==', role: 'employee', firstName: 'Moe', lastName: 'Szyslak Temps Pleins 1', trigramme: 'MSK', email: 'moe@szyslak.com',
	affectedMissions: [
		{_startDate: mission1_customer2._startDate, _endDate: mission1_customer2._endDate, missionId: mission1_customer2._id},
		{_startDate: mission1_customer3._startDate, _endDate: mission1_customer3._endDate, missionId: mission1_customer3._id},
		{_startDate: pre_sale._startDate, _endDate: pre_sale._endDate, missionId: pre_sale._id},
		{_startDate: holiday._startDate, _endDate: holiday._endDate, missionId: holiday._id},
		{_startDate: rtte._startDate, _endDate: rtte._endDate, missionId: rtte._id},
		{_startDate: rtts._startDate, _endDate: rtts._endDate, missionId: rtts._id},
		{_startDate: ae._startDate, _endDate: ae._endDate, missionId: ae._id},
		{_startDate: part_time._startDate, _endDate: part_time._endDate, missionId: part_time._id},
		{_startDate: formation._startDate, _endDate: formation._endDate, missionId: formation._id},
		{_startDate: internal_work._startDate, _endDate: internal_work._endDate, missionId: internal_work._id},
		{_startDate: inter_contrat._startDate, _endDate: inter_contrat._endDate, missionId: inter_contrat._id}
	]});
db.User.insert({username: 'moe-tpl2', password: 'GRB47IMDzwrCDZkunDMRXw==', role: 'employee', firstName: 'Moe', lastName: 'Szyslak Temps Pleins 2', trigramme: 'MSK', email: 'moe@szyslak.com',
	affectedMissions: [
		{_startDate: mission1_customer2._startDate, _endDate: mission1_customer2._endDate, missionId: mission1_customer2._id},
		{_startDate: mission1_customer3._startDate, _endDate: mission1_customer3._endDate, missionId: mission1_customer3._id},
		{_startDate: pre_sale._startDate, _endDate: pre_sale._endDate, missionId: pre_sale._id},
		{_startDate: holiday._startDate, _endDate: holiday._endDate, missionId: holiday._id},
		{_startDate: rtte._startDate, _endDate: rtte._endDate, missionId: rtte._id},
		{_startDate: rtts._startDate, _endDate: rtts._endDate, missionId: rtts._id},
		{_startDate: ae._startDate, _endDate: ae._endDate, missionId: ae._id},
		{_startDate: part_time._startDate, _endDate: part_time._endDate, missionId: part_time._id},
		{_startDate: formation._startDate, _endDate: formation._endDate, missionId: formation._id},
		{_startDate: internal_work._startDate, _endDate: internal_work._endDate, missionId: internal_work._id},
		{_startDate: inter_contrat._startDate, _endDate: inter_contrat._endDate, missionId: inter_contrat._id}
	]});
db.User.insert({username: 'moe-tpa1', password: 'tn6Qc/dtRaO9Iye32h4UOw==', role: 'employee', firstName: 'Moe', lastName: 'Szyslak Temps Partiel 1', trigramme: 'MSK', email: 'moe@szyslak.com',
	affectedMissions: [
		{_startDate: mission1_customer2._startDate, _endDate: mission1_customer2._endDate, missionId: mission1_customer2._id},
		{_startDate: mission1_customer3._startDate, _endDate: mission1_customer3._endDate, missionId: mission1_customer3._id},
		{_startDate: pre_sale._startDate, _endDate: pre_sale._endDate, missionId: pre_sale._id},
		{_startDate: holiday._startDate, _endDate: holiday._endDate, missionId: holiday._id},
		{_startDate: rtte._startDate, _endDate: rtte._endDate, missionId: rtte._id},
		{_startDate: rtts._startDate, _endDate: rtts._endDate, missionId: rtts._id},
		{_startDate: ae._startDate, _endDate: ae._endDate, missionId: ae._id},
		{_startDate: part_time._startDate, _endDate: part_time._endDate, missionId: part_time._id},
		{_startDate: formation._startDate, _endDate: formation._endDate, missionId: formation._id},
		{_startDate: internal_work._startDate, _endDate: internal_work._endDate, missionId: internal_work._id},
		{_startDate: inter_contrat._startDate, _endDate: inter_contrat._endDate, missionId: inter_contrat._id}
	]});
db.User.insert({username: 'moe-tpa2', password: 'pcUHwGQpyWBqwVQhh6c5Pg==', role: 'employee', firstName: 'Moe', lastName: 'Szyslak Temps Partiel 2', trigramme: 'MSK', email: 'moe@szyslak.com',
	affectedMissions: [
		{_startDate: mission1_customer2._startDate, _endDate: mission1_customer2._endDate, missionId: mission1_customer2._id},
		{_startDate: mission1_customer3._startDate, _endDate: mission1_customer3._endDate, missionId: mission1_customer3._id},
		{_startDate: pre_sale._startDate, _endDate: pre_sale._endDate, missionId: pre_sale._id},
		{_startDate: holiday._startDate, _endDate: holiday._endDate, missionId: holiday._id},
		{_startDate: rtte._startDate, _endDate: rtte._endDate, missionId: rtte._id},
		{_startDate: rtts._startDate, _endDate: rtts._endDate, missionId: rtts._id},
		{_startDate: ae._startDate, _endDate: ae._endDate, missionId: ae._id},
		{_startDate: part_time._startDate, _endDate: part_time._endDate, missionId: part_time._id},
		{_startDate: formation._startDate, _endDate: formation._endDate, missionId: formation._id},
		{_startDate: internal_work._startDate, _endDate: internal_work._endDate, missionId: internal_work._id},
		{_startDate: inter_contrat._startDate, _endDate: inter_contrat._endDate, missionId: inter_contrat._id}
	]});
db.User.insert({username: 'seymour', password: '/mQGPJqqQBru0Shwi1/MeQ==', role: 'employee', firstName: 'Seymour', lastName: 'Skinner', trigramme: 'SSR', email: 'seymour@skinner.com', isManager: true});
db.User.insert({username: 'marge', password: '9FC56hi/fYLa0SL3KcCTXw==', role: 'production', firstName: 'marge', lastName: 'Simpson', trigramme: 'MSN', email: 'marge@simpson.com'});
db.User.insert({username: 'ned', password: '9o2q0Ymy//0LjKteNuydlg==', role: 'employee', firstName: 'Ned', lastName: 'Flanders', trigramme: 'NFS',
	email: 'ned@flanders.com', isManager: true});
var ned = db.User.findOne({username: 'ned'});
db.User.insert({username: 'bart', password: '9UFGo/yCqxflJlaVsj9kaw==', role: 'employee', firstName: 'bart', lastName: 'Simpson', trigramme: 'BSN', email: 'bart@simpson.com',
	'managerId': ned._id,
	affectedMissions: [
		{_startDate: mission1_customer1._startDate, _endDate: mission1_customer1._endDate, missionId: mission1_customer1._id},
		{_startDate: mission2_customer1._startDate, _endDate: mission2_customer1._endDate, missionId: mission2_customer1._id},
		{_startDate: pre_sale._startDate, _endDate: pre_sale._endDate, missionId: pre_sale._id},
		{_startDate: holiday._startDate, _endDate: holiday._endDate, missionId: holiday._id},
		{_startDate: rtte._startDate, _endDate: rtte._endDate, missionId: rtte._id},
		{_startDate: rtts._startDate, _endDate: rtts._endDate, missionId: rtts._id},
		{_startDate: ae._startDate, _endDate: ae._endDate, missionId: ae._id},
		{_startDate: part_time._startDate, _endDate: part_time._endDate, missionId: part_time._id},
		{_startDate: formation._startDate, _endDate: formation._endDate, missionId: formation._id},
		{_startDate: internal_work._startDate, _endDate: internal_work._endDate, missionId: internal_work._id},
		{_startDate: inter_contrat._startDate, _endDate: inter_contrat._endDate, missionId: inter_contrat._id}
	]});
var bart = db.User.findOne({username: 'bart'});


/*
 * Vehicle
 */
db.Vehicle.insert({
	userId: bart._id,
	vehicleType: "car",
	power: NumberInt(5),
	brand: "ALFA_ROMEO",
	matriculation: "AA-123-AA",
	_startDate: new Date(YEAR, MARCH_JS, ONE),
	active: true
});
/*
 * Cra
 */
/*
 db.Cra.insert({year: YEAR, month: MARCH, userId: bart._id, comment: 'Commentaire cra...', isValidated: false});
 var cra = db.Cra.findOne({year: YEAR, month: MARCH});
 */
/*
 * Absence
 */
/*
 db.Absence.insert({
 userId: bart._id,
 missionId: holiday._id,
 startMorning: true,
 endAfternoon: true,
 _nbDays: "3",
 comment: "Comment absence...",
 _startDate: new Date(cra.year, MARCH_JS, NumberInt(12), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0)),
 _endDate: new Date(cra.year, MARCH_JS, NumberInt(14), NumberInt(23), NumberInt(59), NumberInt(59), NumberInt(0))
 });
 */
/*
 * Day
 */
// 2013/03/01
/*db.Day.insert({
 craId: cra._id,
 userId: bart._id,
 year: YEAR,
 month: MARCH,
 _date: new Date(YEAR, MARCH_JS, ONE),
 morning: {
 missionId: mission1_customer1._id
 },
 afternoon: {
 missionId: mission1_customer1._id
 },
 comment: 'Comment day ...'
 });
 db.Claim.insert({
 userId: bart._id,
 year: YEAR,
 month: MARCH,
 _date: new Date(YEAR, MARCH_JS, ONE),
 missionId: mission1_customer1._id,
 claimType: "MISSION_ALLOWANCE",
 _amount: "4.70"
 });
 // 2013/03/05
 db.Day.insert({
 craId: cra._id,
 userId: bart._id,
 year: YEAR,
 month: MARCH,
 _date: new Date(YEAR, MARCH_JS, NumberInt(5)),
 morning: {
 missionId: mission1_customer1._id
 },
 afternoon: {
 missionId: mission1_customer1._id
 }
 });
 db.Claim.insert({
 userId: bart._id,
 year: YEAR,
 month: MARCH,
 _date: new Date(YEAR, MARCH_JS, NumberInt(5)),
 missionId: mission1_customer1._id,
 claimType: "MISSION_ALLOWANCE",
 _amount: "4.70"
 });
 // 2013/03/06
 db.Day.insert({
 craId: cra._id,
 userId: bart._id,
 year: YEAR,
 month: MARCH,
 _date: new Date(YEAR, MARCH_JS, NumberInt(6)),
 morning: {
 missionId: pre_sale._id
 },
 afternoon: {
 missionId: pre_sale._id
 },
 comment: 'Comment day ...'
 });
 db.Claim.insert({
 userId: bart._id,
 year: YEAR,
 month: MARCH,
 _date: new Date(YEAR, MARCH_JS, NumberInt(6)),
 missionId: mission1_customer1._id,
 claimType: "MISSION_ALLOWANCE",
 _amount: "4.70"
 });
 // 2013/03/07
 db.Day.insert({
 craId: cra._id,
 userId: bart._id,
 year: YEAR,
 month: MARCH,
 _date: new Date(YEAR, MARCH_JS, NumberInt(7)),
 morning: {
 periods: [
 {
 missionId: mission1_customer1._id,
 _startTime: new Date(cra.year, MARCH_JS, NumberInt(7),NumberInt(5),NumberInt(0),NumberInt(0),NumberInt(0)),
 _endTime: new Date(cra.year, MARCH_JS, NumberInt(7),NumberInt(6),NumberInt(0),NumberInt(0),NumberInt(0))
 }
 ]
 },
 afternoon: {
 periods: [
 {
 missionId: mission1_customer1._id,
 _startTime: new Date(cra.year, MARCH_JS, NumberInt(7),NumberInt(15),NumberInt(0),NumberInt(0),NumberInt(0)),
 _endTime: new Date(cra.year, MARCH_JS, NumberInt(7),NumberInt(16),NumberInt(0),NumberInt(0),NumberInt(0))
 }
 ]
 },
 comment: "Comment 1\nComment 2"
 });
 db.Claim.insert({
 userId: bart._id,
 year: YEAR,
 month: MARCH,
 _date: new Date(YEAR, MARCH_JS, NumberInt(7)),
 missionId: mission1_customer1._id,
 claimType: "MISSION_ALLOWANCE",
 _amount: "4.70"
 });
 // 2013/03/12
 db.Day.insert({
 craId: cra._id,
 userId: bart._id,
 year: YEAR,
 month: MARCH,
 _date: new Date(YEAR, MARCH_JS, NumberInt(12)),
 morning: {
 missionId: holiday._id
 },
 afternoon: {
 missionId: holiday._id
 },
 comment: 'Comment absence...'
 });
 // 2013/03/13
 db.Day.insert({
 craId: cra._id,
 userId: bart._id,
 year: YEAR,
 month: MARCH,
 _date: new Date(YEAR, MARCH_JS, NumberInt(13)),
 morning: {
 missionId: holiday._id
 },
 afternoon: {
 missionId: holiday._id
 },
 comment: 'Comment absence...'
 });
 // 2013/03/14
 db.Day.insert({
 craId: cra._id,
 userId: bart._id,
 year: YEAR,
 month: MARCH,
 _date: new Date(YEAR, MARCH_JS, NumberInt(14)),
 morning: {
 missionId: holiday._id
 },
 afternoon: {
 missionId: holiday._id
 },
 comment: 'Comment absence...'
 });*/

/*
 * Claim
 */
/*db.Claim.insert({
 userId: bart._id,
 year: YEAR,
 month: MARCH,
 _date: new Date(YEAR, MARCH_JS, NumberInt(4)),
 missionId: mission1_customer1._id,
 claimType: "TAXI",
 comment: "Acheter des donuts",
 _amount: "10.2"
 });
 db.Claim.insert({
 userId: bart._id,
 year: YEAR,
 month: MARCH,
 _date: new Date(YEAR, MARCH_JS, NumberInt(4)),
 missionId: mission1_customer1._id,
 claimType: "JOURNEY",
 journey: "Springfield",
 comment: "Acheter des donuts",
 _kilometer: "11.5",
 _kilometerAmount: "63.25"
 });
 db.Claim.insert({
 userId: bart._id,
 year: YEAR,
 month: MARCH,
 _date: new Date(YEAR, MARCH_JS, NumberInt(12)),
 missionId: mission1_customer1._id,
 claimType: "TOLL",
 _amount: "11.5"
 });
 db.Claim.insert({
 userId: bart._id,
 year: YEAR,
 month: MARCH,
 _date: new Date(YEAR, MARCH_JS, NumberInt(4)),
 missionId: mission1_customer1._id,
 claimType: "TOLL",
 _amount: "17"
 });*/

printjson(bart._id);
