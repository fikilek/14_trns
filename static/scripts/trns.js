console.log('START running trns.js')

$(document).ready(function() {

console.log('START trns.js document ready function')

	const ireps_ui_controller = (function(){

		class Idt {
			constructor(cols, data){
				this.cols = cols;
				this.data = data;
				this.dt_instance = $('#idt').DataTable({
					"select": "single",
		      "columns": this.cols,
		      "data": this.data,
		      "dom": '<"top"<"pml"><"pmr"B>>>rt <"bottom"lip>',
					"initComplete": (settings, json) => {

		        //create the input search boxes at the top of the datatable on a row (tr) below thead.
		        //this is done by cloning tr of thead and append it to same thead of the datatable (#ireps_dt)
		        $('#idt thead tr').clone(false).appendTo( '#idt thead' );
		        $('#idt thead tr:eq(1) th').each( function () {
	            let title = $(this).text().trim();
	            $(this).html( '<input class="col_search" type="text" placeholder=" '+title+' " />' );
		        });

		        // Apply the search. this search function actually filters the column for a value in the input box
		        let self = this;
		        $('#idt thead').on('keyup change', '.col_search', function () {
	            self.dt_instance.column( $(this).parent().index() ).search( this.value ).draw();
		        });
					},
		    });
			}
			set_cols = (idt_columns_map) => {
				let self = this;
				self.dt_instance.columns().every(function(key, value) {
					$(self.dt_instance.column(key).header()).text(idt_columns_map().get($(self.dt_instance.column(key).header()).text().trim()));
				})
				return this;
			}
		}

		return {
			Idt: Idt,
		}

	})(); //uuc


	const ireps_data_controller = (function(app){

		//create a transactions class
		class Trns {
	//		idz is an array of IDs for each trn. if idz are no supplied, then fetch from the given dr,.
	//    dr is daterange which is an object with start date and end date
	//    asc is asset category ['bk', 'em', 'wm', 'pl', 'cb', 'cl']
	//    trn is transaction ['grv', rdg, pur, etc]

				constructor(idz, dr, asc = '', trn = ''){  //todo: add dr and st to the arguments of the constructor
	//			trns is an array of transactions
	//      IdbTrns is an object use to go to the ireps trns table and get all requested transactions
	//      all objects starting with Idb are ireps database object that ae used ot interact with ireps db.
					this.ids = idz;
					this.dr = dr;
					this.asc = 'em';
					this.trn = '';
					this.trns = new IdbTrns(idz, dr, asc. trn).set_trns(asc).get_trns();
				}
				get_trns = () => this.trns;
				get_trns_cols = () => {
					return create_dt_columns(this.trns);
				}
			}

		//create transaction class
		class Trn {
				constructor(trn_a01_id = ''){
					this.trn_a01_id = trn_a01_id;
					this.trn = {};
				}
				set_trn = (asc) => {
	//			go to trn and trn_?? table and use trn_id to get trn data and set this.trn.
	//      todo: retrieve trn data from trn database table
					this.trn = {
	//        common trn data
	//				asset identity data
						"trn_aa1_id": this.trn_a01_id,
						"trn_aa2_uuid": "ac20a762-e183-455f-a840-186efe5be79a",

						"trn_ab1_arc": asc,  //asset category
						"trn_ab2_trn": "12grv",  //transaction name [grv
						"trn_ab3_tst": "pending",  //transaction state [pending, submitted, qa_fail, qa_pass, qa_pending, no_access, arrangement]

						"trn_ac1_ast_id": "", //id of the asset linked to the transaction
						"trn_ac2_qa": "", //whether this is a qza transaction or not
						"trn_ac3_form_id": "",
						"trn_ac4_access": "",

						"trn_ad1_server_created_by": "fikile kentane",
						"trn_ad2_server_created_on_datetime": "2019-06-14T08:45:45Z",
						"trn_ad3_server_updated_by": "sitha kentane",
						"trn_ad4_server_updated_on_datetime": "2019-06-14T08:45:45Z",

						"trn_ae1_mobile_device_updated_by": "fikile kentane",
						"trn_ae2_mobile_device_updated_on_datetime": "2019-06-14T08:45:45Z",
						"trn_ae3_mobile_device_updated_by": "siya kentane",
						"trn_ae4_mobile_device_updated_on_datetime": "2019-06-14T08:45:45Z",

					};
					return this;
				}
				get_trn = () =>  this.trn
			}

		//create an class to connect to the db and get transactions.
		class IdbTrns {
				constructor(idz, dr, asc, trn){
	//			todo: collect all the required data from the db using dr, asc and trn then assign to this.trns. there will be no need for set_trns, only get_trns will be needed.
					this.dr = dr
					this.trns = [];
				}
				set_trns = (asc) => {
					this.trns = [
						new Trn(1).set_trn(asc).get_trn(),
						new Trn(2).set_trn(asc).get_trn(),
						new Trn(3).set_trn(asc).get_trn(),
						new Trn(5).set_trn(asc).get_trn(),
						new Trn(6).set_trn(asc).get_trn(),
						new Trn(7).set_trn(asc).get_trn(),
					]
					return this;
				}
				get_trns = () => this.trns;
			}


		//create helper function to create columns of datatables
		const create_dt_columns = (dt_data) => {
			let cols, columns;
			if(dt_data){
				cols = Object.keys(dt_data[0]);
				columns = cols.map((value, index) => {
					return { 'data': value, 'title': value };
				});
			} else (
				columns = { 'data': 'empty', 'title': 'empty' }
			)
			return columns;
		}


		return {
			Trns: Trns
		}

	})(); //idc

	//iuc : ireps user interface controller
	//idc : ireps data controller
	(function(iuc, idc) {
			const trns = new idc.Trns();
			const data = trns.get_trns();
			const cols = trns.get_trns_cols();
			const trns_dt = new iuc.Idt(cols, data);
	})(ireps_ui_controller, ireps_data_controller);

console.log('END trns.js document ready function')

});

console.log('END running trns.js')
