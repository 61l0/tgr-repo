<?php
class GajiController extends AppController
{
    var $name = 'gaji';
	var $uses=null;
	
	function index()
    {
		
     	
    }
	
	function getsingle(){
		Configure::write('debug',1);
		$this->layout = 'ajax';
		$limit=10;$start=0;
		if(isset($_POST['query']))
			$key = $_POST['query'];
		else $key="";
		if(isset($_POST['limit']))
			$limit = $_POST['limit'];
		$limit=20;
	 	$this->layout='ajax';
		if(isset($_POST['start']))
			$start= $_POST['start'];
		$start=0;
		$page = ($start/$limit)+1;
		App::import('Model','gajimasterlist');
		$master=new GajiMasterList();
		 
		if ($key!=""){
			$key=strtolower($key);
		
			$whereis=array('conditions'=> 
											array('AND'=>array(array('lower(GajiMasterList.gm_no)' =>"$key"))),
										'order'=>'GajiMasterList.gm_no','limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>array(array('lower(GajiMasterList.gm_no) '=>"$key") )) );
			$dataAll=$master->find('all',$whereis);
			$count=$master->find('count',$wherecount);
		}
		else {
			$dataAll=$master->find('all' ,array('conditions'=>array('GajiMasterList.gm_no'=>"$key"),'limit'=>$limit,'page'=>$page));
			$count=$master->find('count',array('conditions'=>array('GajiMasterList.gm_no'=>"$key")));
		}
		$dataAll = Set::extract($dataAll,'{n}.GajiMasterList');
		$this->set('dataAll','{"total":'.$count.',"gajimasters":'.json_encode($dataAll).'}');
	}  
	 
	function getforcombo(){
		Configure::write('debug',1);
		$this->layout = 'ajax';
		$limit=10;$start=0;
		if(isset($_POST['query']))
			$key = $_POST['query'];
		else $key="";
		if(isset($_POST['limit']))
			$limit = $_POST['limit'];
		$limit=20;
	 	$this->layout='ajax';
		if(isset($_POST['start']))
			$start= $_POST['start'];
		$start=0;
		$page = ($start/$limit)+1;
		App::import('Model','gajimasterlist');
		$master=new GajiMasterList();
		$un_id="";
		if(isset($_POST['un_id']))
			$un_id= $_POST['un_id']; 
		if ($key!=""){
			$key=strtolower($key);
		
			$whereis=array('conditions'=> array('AND'=>array(array('lower(GajiMasterList.gm_no) LIKE '=>"%$key%") )),
											array('AND'=>array(array('GajiMasterList.un_id' =>$un_id))),
										'order'=>'GajiMasterList.gm_no','limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>array(array('lower(GajiMasterList.gm_no) LIKE '=>"%$key%") )),
												array('AND'=>array(array('GajiMasterList.un_id' =>$un_id))));
			$dataAll=$master->find('all',$whereis);
			$count=$master->find('count',$wherecount);
		}
		else {
			$dataAll=$master->find('all' ,array('conditions'=>array('GajiMasterList.un_id'=>$un_id),'limit'=>$limit,'page'=>$page));
			$count=$master->find('count',array('conditions'=>array('GajiMasterList.un_id'=>$un_id)));
		}
		$dataAll = Set::extract($dataAll,'{n}.GajiMasterList');
		$this->set('dataAll','{"total":'.$count.',"gajimasters":'.json_encode($dataAll).'}');
	}  
	function adddetail0(){
		Configure::write('debug',2);
		set_error_handler(array($this, 'handleError'));
		$this->layout = 'ajax';
			if ($this->data['GajiDetail0']['dpam_no']!=''){
				$this->data['GajiDetail0']['gd_nilai']=r(',','',$this->data['GajiDetail0']['gd_nilai']); 
				$this->data['GajiDetail0']['gd_tersedia']=r(',','',$this->data['GajiDetail0']['gd_tersedia']); 
				$this->data['GajiDetail0']['gd_sisa']=r(',','',$this->data['GajiDetail0']['gd_sisa']); 
				$this->data['GajiDetail0']['gd_angg']=r(',','',$this->data['GajiDetail0']['gd_angg']); 
				App::import('Model','gajidetail0');
				$detail0=new GajiDetail0;
				$check0=$detail0->findByGajim_id($this->data['GajiDetail0']['gm_id']);
				if(!empty($check0)){
					$detail0->gd_id=$check0['GajiDetail0']['gd_id'];
				}
				else {
					$detail0->create();
				}
				$detail0->save($this->data);
			}
			$this->set('success', '{success:true}');
	}
	 
	function getdetail0(){
		Configure::write('debug',1);
		$this->layout = 'ajax';
		$limit=10;$start=0;
		if(isset($_REQUEST['gm_id']))
			$master_id = $_REQUEST['gm_id'];
		else $master_id="";
		 
		App::import('Model','gajidetail0');
		$detail=new GajiDetail0();
		 
		$dataAll=$detail->find('all' ,array('conditions'=>array('gm_id'=>$master_id),'order'=>'gd_id','limit'=>1));
		$count=$detail->find('count',array('conditions'=>array('gm_id'=>$master_id)));
		 
		$dataAll = Set::extract($dataAll,'{n}.GajiDetail0');
		$this->set('dataAll','{"total":'.$count.',"gajidetails":'.json_encode($dataAll).'}');
	}  
	 function add(){
		Configure::write('debug',2);
		set_error_handler(array($this, 'handleError'));
		$this->layout = 'ajax';
		App::import('Model','gajimaster');
		$gajimaster=new GajiMaster;
	 
		if (!empty($this->data)) {
			    $admin=$this->Session->read('PB_USER_SESSION');
			
			  
				//check if user exists
			  	$this->data['GajiMaster']['gm_kotor']=r(',','',$this->data['GajiMaster']['gm_kotor']);
				$this->data['GajiMaster']['gm_bersih']=r(',','',$this->data['GajiMaster']['gm_bersih']);
				$this->data['GajiMaster']['gm_potongan']=r(',','',$this->data['GajiMaster']['gm_potongan']);
				$this->data['GajiMaster']['gm_bulan']=r('.00','',r(',','',$this->data['GajiMaster']['gm_bulan']));
				$ayear=date('Y');
				$this->data['GajiMaster']['gm_tahun']=$ayear;
			 	 $this->data['GajiMaster']['gm_bulat']=r(',','',$this->data['GajiMaster']['gm_bulat']);
				$checkdata=$gajimaster->findByGm_id($this->data['GajiMaster']['gm_id']);
				 if (empty($checkdata)) {
				 
					$gajimaster->create();
				 }
				 else {
				 	$gajimaster->gm_id=$this->data['GajiMaster']['gm_id'];
				 }
				 
					try {
						if ($gajimaster->save($this->data)) {
						//	$newid=$salesmaster->getLastInsertID();
						if (isset($gajimaster->gm_id)) $newid=$gajimaster->gm_id;
						else $newid=$gajimaster->getLastInsertID();
							//
							#checkdetail0
							
							$newno=$this->data['GajiMaster']['gm_no'];
							$this->set('success', '{success:true,newid:"'.$newid.'",newno:"'.$newno.'"}');
						} else {
							$this->set('success', '{success:false,msg: "Could not save to database"}');
						}
					}
					catch(exception $e)
					{
					 	$this->set('success', '{success:false,msg: '.json_encode(strip_tags(htmlspecialchars_decode($e->getMessage()))).'}');
					  
					  
					}
			 
			 }
			 else {
			 	$this->set('success', '{success:false,msg: "You do not have privilege"}');

			 }
	 

	}
	function getall(){
		
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','gajimasterlist');
		$gajimasterlist=new GajiMasterList;
		$limit=20;$start=0;
		$search='*';
		if(isset($_POST['limit']))
			$limit = $_POST['limit'];
	 	if(isset($_POST['start']))
			$start= $_POST['start'];
		if(isset($_POST['search']))
			$search=strtolower(trim($_POST['search']));
		$page = ($start/$limit)+1;
		if($search!='' && $search!="*"){
			$whereis=array( 'conditions'=>array('AND'=>
			array('OR'=>array(
					array('lower(gm_no)  LIKE' => "%$search%"),
					array('lower(un_kode) LIKE' =>"%$search%"),
					array('lower(un_nama) LIKE' =>"%$search%") 
				 )) 
			),
			'order'=> 'GajiMasterList.gm_tgl asc' ,'limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>
				array('OR'=>array(
						array('lower(gm_no)  LIKE' => "%$search%"),
					array('lower(un_kode) LIKE' =>"%$search%"),
					array('lower(un_nama) LIKE' =>"%$search%") )) 
			));
		}
		else {
	  		$whereis=array(  'order'=>'GajiMasterList.gm_tgl asc','limit'=>$limit,'page'=>$page);
			$wherecount=array();
		}
		$dataAll=$gajimasterlist->find('all',$whereis);
		$count=$gajimasterlist->find('count',$wherecount);
 		 $this->set('dataAll','{"total":'.$count.',"gajimasters":'.json_encode($dataAll).'}');

	}
	//POTONGAN
  	function readdetail_2($form_no=0){
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','gajidetail2list');
		$detaillist=new GajiDetail2List;
		$mid=0;
		if(isset($_POST['gm_id']))
			$mid = $_POST['gm_id'];
		$dataall=$detaillist->find('all',array('conditions'=>array('gm_id'=>$mid),'order'=>'gd_id'));
		$count=$detaillist->find('count',array('conditions'=>array('gm_id'=>$mid)));
		 $results = Set::extract($dataall,'{n}.GajiDetail2List');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	function createdetail_2(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		$this->layout='ajax';
			App::import('Model','gajidetail2');
		$detail=new GajiDetail2;
		$datalist='';
		$masterid=0;
		$acum_msg='';
		if(isset($_POST['data']))
			$datalist = $_POST['data'];


		if(isset($_POST['master']))
			$masterid= $_POST['master'];
		if ($datalist!='' && $masterid!=''){
			$dataall=json_decode($datalist);
			if (is_array($dataall)){
				//print_r($dataall);
				$newarr=array();
				foreach($dataall as $adata){
					//each loop 1 record
					$arr1=array();
					 
                    $data1=array();
					foreach($adata as $k => $v) {
					    $data1['GajiDetail2'][$k]=$v;
                        $arr1[$k]=$v;
						 
                       
					}
                    $data1['GajiDetail2']['gm_id']=$masterid;
                    $data1['GajiDetail2']['src_code']=null;
                   
				 	$detail->primaryKey="gd_id";
					try {
						if ($detail->save($data1)){
							    if ($data1['GajiDetail2']['gd_id']=="0")
								    $arr1["gd_id"]=($detail->getLastInsertID());
								$arr1["gm_id"]=$masterid;
							 

						}
					}
					catch(exception $e)
					{
					 	$acum_msg=$acum_msg.' '.$e->getMessage();
					  
					}
					$newarr[]=$arr1;
					 

				}
				$success='true';
				if ($acum_msg==''){
					$acum_msg='Successfully created records...';
				}
				else {
					$acum_msg='There are some error : '.$acum_msg;
					$success='false';
				}
				$this->set('success', '{"success":'.$success.',"message":'.json_encode($acum_msg).',"data":'.json_encode($newarr).'}');

			}
			else {
				//echo "no array";

				 
					$arr1=array();

					$newdata=false;
                    $data1=array();
					foreach($dataall as $k => $v) {
					   $data1['GajiDetail2'][$k]=$v;
                        $arr1[$k]=$v;
                       
					}
                    $data1['GajiDetail2']['src_code']=null;
                    $data1['GajiDetail2']['gm_id']=$masterid;
				  
					$detail->primaryKey="gd_id";
					try{
						if ($detail->save($data1)){
						        if ($data1['GajiDetail2']['gd_id']=="0")
                                    $arr1["gd_id"]=($detail->getLastInsertID());  
								 
								 $arr1["gm_id"]=$masterid;
						 }
					}
					catch(exception $e)
					{
					 	$acum_msg=$acum_msg.' '.$e->getMessage();
					  
					}
					$success='true';
					if ($acum_msg==''){
						$acum_msg='Successfully created records...';
					}
					else {
						$acum_msg='There are some error : '.$acum_msg;
						$success='false';
					}
					$this->set('success', '{"success":'.$success.',"message":'.json_encode($acum_msg).',"data":'.json_encode($arr1).'}');

			}
		}
		else {
			$this->set('success', '{"success":false,"message":"No Data"}');

		}
	 }
function updatedetail_2(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		App::import('Model','gajidetail2');
		$detail=new GajiDetail2;
		$this->layout='ajax';
		$datalist='';
		$masterid=0;
		$acum_msg='';
		if(isset($_POST['data']))
			$datalist = $_POST['data'];


		if(!empty($_POST['master']))
			$masterid= $_POST['master'];
		if ($datalist!='' && $masterid!=''){
			$dataall=json_decode($datalist);
			if (is_array($dataall)){
				//print_r($dataall);
				$newarr=array();
				foreach($dataall as $adata){
					//each loop 1 record
					$arr1=array();
					 
                    $data1=array();
                    foreach($adata as $k => $v) {
                        $data1['GajiDetail2'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['GajiDetail2']['gm_id']=$masterid;
                    $data1['GajiDetail2']['src_code']=null;
                   
                    $detail->primaryKey="gd_id";
                    try {
                        if ($detail->save($data1)){
                            if ($data1['GajiDetail2']['gd_id']=="0")
                                    $arr1["gd_id"]=($detail->getLastInsertID());
                            $arr1["gm_id"]=$masterid;
							 
						}
					}
					catch(exception $e)
					{
					 	$acum_msg=$acum_msg.' '.$e->getMessage();
					  
					}
					$newarr[]=$arr1;
					 
				}
				//print_r($newarr);
				//echo json_encode($newarr);
				
				$success='true';
				if ($acum_msg==''){
					$acum_msg='Successfully update records...';
				}
				else {
					$acum_msg='There are some error : '.$acum_msg;
				    $success='false'; 
				}
				$this->set('success', '{"success":'.$success.',"message":'.json_encode($acum_msg).',"data":'.json_encode($newarr).'}');


			}
			else {
				//echo "no array";

					 
					$arr1=array();

					$newdata=false;
					foreach($adata as $k => $v) {
                        $data1['GajiDetail2'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['GajiDetail2']['gm_id']=$masterid;
                    $data1['GajiDetail2']['src_code']=null;
                   
                    $detail->primaryKey="gd_id";
                    try {
                        if ($detail->save($data1)){
								  if ($data1['GajiDetail2']['gd_id']=="0")
                                    $arr1["gd_id"]=($detail->getLastInsertID());
								 $arr1["gm_id"]=$masterid;
	
						}
					}
					catch(exception $e)
					{
					 	$acum_msg=$acum_msg.' '.$e->getMessage();
					  
					}
					 
					$success=true;
					if ($acum_msg==''){
						$acum_msg='Successfully created records...';
					}
					else {
						$acum_msg='There are some error : '.$acum_msg;
						$success=false;
					}
					$this->set('success', '{"success":'.$success.',"message":'.json_encode($acum_msg).',"data":'.json_encode($arr1).'}');


			}
		}
		else {
			$this->set('success', '{"success":false,"message":"Tidak ada data untuk disimpan"}');

		}
	 }
	function destroydetail_2(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','gajidetail2');
		$detail=new GajiDetail2();
		$datalist='';
		$masterid=0;
		$acum_msg='';
		if(isset($_POST['data']))
			$datalist = $_POST['data'];


		if(isset($_POST['master']))
			$masterid= $_POST['master'];
		if ($datalist!='' && $masterid!=''){
			$dataall=json_decode($datalist);
			foreach ($dataall as $dataid){
				$detail->primaryKey='gd_id';
				try {
					$detail->delete($dataid);
				}
				catch(exception $e)
				{
				 	$acum_msg=$acum_msg.' '.$e->getMessage();
				  
				}
			}
				$success='true';
				if ($acum_msg==''){
					$acum_msg='Successfully update records...';
				}
				else {
					$acum_msg='There are some error : '.$acum_msg;
					$success='false';
				}
				$this->set('success', '{"success":'.$success.',"message":'.json_encode($acum_msg).',"data":[]}');

			 

		}
		else {
			$this->set('success', '{"success":false,"message":"Tidak ada data untuk disimpan"}');

		}
	}
///----- rekening gaji

	function readdetail_1($form_no=0){
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','gajidetail1list');
		$detaillist=new GajiDetail1List;
		$mid=0;
		if(isset($_POST['gm_id']))
			$mid = $_POST['gm_id'];
		$dataall=$detaillist->find('all',array('conditions'=>array('gm_id'=>$mid)));
		$count=$detaillist->find('count',array('conditions'=>array('gm_id'=>$mid)));
		 $results = Set::extract($dataall,'{n}.GajiDetail1List');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	function createdetail_1(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		$this->layout='ajax';
			App::import('Model','gajidetail1');
		$detail=new GajiDetail1;
		$datalist='';
		$masterid=0;
		$acum_msg='';
		if(isset($_POST['data']))
			$datalist = $_POST['data'];


		if(isset($_POST['master']))
			$masterid= $_POST['master'];
		if ($datalist!='' && $masterid!=''){
			$dataall=json_decode($datalist);
			if (is_array($dataall)){
				//print_r($dataall);
				$newarr=array();
				foreach($dataall as $adata){
					//each loop 1 record
					$arr1=array();
					 
                    $data1=array();
					foreach($adata as $k => $v) {
					    $data1['GajiDetail1'][$k]=$v;
                        $arr1[$k]=$v;
						 
                       
					}
                    $data1['GajiDetail1']['gm_id']=$masterid;
                    $data1['GajiDetail1']['src_code']=null;
                   
				 	$detail->primaryKey="gd_id";
					try {
						if ($detail->save($data1)){
							    if ($data1['GajiDetail1']['gd_id']=="0")
								    $arr1["gd_id"]=($detail->getLastInsertID());
								$arr1["gm_id"]=$masterid;
							 

						}
					}
					catch(exception $e)
					{
					 	$acum_msg=$acum_msg.' '.$e->getMessage();
					  
					}
					$newarr[]=$arr1;
					 

				}
				$success='true';
				if ($acum_msg==''){
					$acum_msg='Successfully created records...';
				}
				else {
					$acum_msg='There are some error : '.$acum_msg;
					$success='false';
				}
				$this->set('success', '{"success":'.$success.',"message":'.json_encode($acum_msg).',"data":'.json_encode($newarr).'}');

			}
			else {
				//echo "no array";

				 
					$arr1=array();

					$newdata=false;
                    $data1=array();
					foreach($dataall as $k => $v) {
					   $data1['GajiDetail1'][$k]=$v;
                        $arr1[$k]=$v;
                       
					}
                    $data1['GajiDetail1']['src_code']=null;
                    $data1['GajiDetail1']['gm_id']=$masterid;
				  
					$detail->primaryKey="gd_id";
					try{
						if ($detail->save($data1)){
						        if ($data1['GajiDetail1']['gd_id']=="0")
                                    $arr1["gd_id"]=($detail->getLastInsertID());  
								 
								 $arr1["gm_id"]=$masterid;
						 }
					}
					catch(exception $e)
					{
					 	$acum_msg=$acum_msg.' '.$e->getMessage();
					  
					}
					$success='true';
					if ($acum_msg==''){
						$acum_msg='Successfully created records...';
					}
					else {
						$acum_msg='There are some error : '.$acum_msg;
						$success='false';
					}
					$this->set('success', '{"success":'.$success.',"message":'.json_encode($acum_msg).',"data":'.json_encode($arr1).'}');

			}
		}
		else {
			$this->set('success', '{"success":false,"message":"No Data"}');

		}
	 }
function updatedetail_1(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		App::import('Model','gajidetail1');
		$detail=new GajiDetail1;
		$this->layout='ajax';
		$datalist='';
		$masterid=0;
		$acum_msg='';
		if(isset($_POST['data']))
			$datalist = $_POST['data'];


		if(!empty($_POST['master']))
			$masterid= $_POST['master'];
		if ($datalist!='' && $masterid!=''){
			$dataall=json_decode($datalist);
			if (is_array($dataall)){
				//print_r($dataall);
				$newarr=array();
				foreach($dataall as $adata){
					//each loop 1 record
					$arr1=array();
					 
                    $data1=array();
                    foreach($adata as $k => $v) {
                        $data1['GajiDetail1'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['GajiDetail1']['gm_id']=$masterid;
                    $data1['GajiDetail1']['src_code']=null;
                   
                    $detail->primaryKey="gd_id";
                    try {
                        if ($detail->save($data1)){
                            if ($data1['GajiDetail1']['gd_id']=="0")
                                    $arr1["gd_id"]=($detail->getLastInsertID());
                            $arr1["gm_id"]=$masterid;
							 
						}
					}
					catch(exception $e)
					{
					 	$acum_msg=$acum_msg.' '.$e->getMessage();
					  
					}
					$newarr[]=$arr1;
					 
				}
				//print_r($newarr);
				//echo json_encode($newarr);
				
				$success='true';
				if ($acum_msg==''){
					$acum_msg='Successfully update records...';
				}
				else {
					$acum_msg='There are some error : '.$acum_msg;
				    $success='false'; 
				}
				$this->set('success', '{"success":'.$success.',"message":'.json_encode($acum_msg).',"data":'.json_encode($newarr).'}');


			}
			else {
				//echo "no array";

					 
					$arr1=array();

					$newdata=false;
					foreach($adata as $k => $v) {
                        $data1['Gajidetail1'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['GajiDetail1']['gm_id']=$masterid;
                    $data1['GajiDetail1']['src_code']=null;
                   
                    $detail->primaryKey="gd_id";
                    try {
                        if ($detail->save($data1)){
								  if ($data1['GajiDetail1']['gd_id']=="0")
                                    $arr1["gd_id"]=($detail->getLastInsertID());
								 $arr1["gm_id"]=$masterid;
	
						}
					}
					catch(exception $e)
					{
					 	$acum_msg=$acum_msg.' '.$e->getMessage();
					  
					}
					 
					$success=true;
					if ($acum_msg==''){
						$acum_msg='Successfully created records...';
					}
					else {
						$acum_msg='There are some error : '.$acum_msg;
						$success=false;
					}
					$this->set('success', '{"success":'.$success.',"message":'.json_encode($acum_msg).',"data":'.json_encode($arr1).'}');


			}
		}
		else {
			$this->set('success', '{"success":false,"message":"Tidak ada data untuk disimpan"}');

		}
	 }
	function destroydetail_1(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','gajidetail1');
		$detail=new GajiDetail1();
		$datalist='';
		$masterid=0;
		$acum_msg='';
		if(isset($_POST['data']))
			$datalist = $_POST['data'];


		if(isset($_POST['master']))
			$masterid= $_POST['master'];
		if ($datalist!='' && $masterid!=''){
			$dataall=json_decode($datalist);
			foreach ($dataall as $dataid){
				$detail->primaryKey='gd_id';
				try {
					$detail->delete($dataid);
				}
				catch(exception $e)
				{
				 	$acum_msg=$acum_msg.' '.$e->getMessage();
				  
				}
			}
				$success='true';
				if ($acum_msg==''){
					$acum_msg='Successfully update records...';
				}
				else {
					$acum_msg='There are some error : '.$acum_msg;
					$success='false';
				}
				$this->set('success', '{"success":'.$success.',"message":'.json_encode($acum_msg).',"data":[]}');

			 

		}
		else {
			$this->set('success', '{"success":false,"message":"Tidak ada data untuk disimpan"}');

		}
	}


	//pajak
	//PAJAK
  	function readdetail_3($form_no=0){
		Configure::write('debug',1);
		$this->layout='ajax';
		App::import('Model','gajidetail3list');
		$detaillist=new GajiDetail3List;
		$mid=0;
		if(isset($_POST['gm_id']))
			$mid = $_POST['gm_id'];
		$dataall=$detaillist->find('all',array('conditions'=>array('gm_id'=>$mid),'order'=>'gd_id'));
		$count=$detaillist->find('count',array('conditions'=>array('gm_id'=>$mid)));
		 $results = Set::extract($dataall,'{n}.GajiDetail3List');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	function createdetail_3(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		$this->layout='ajax';
			App::import('Model','gajidetail3');
		$detail=new GajiDetail3;
		$datalist='';
		$masterid=0;
		$acum_msg='';
		if(isset($_POST['data']))
			$datalist = $_POST['data'];


		if(isset($_POST['master']))
			$masterid= $_POST['master'];
		if ($datalist!='' && $masterid!=''){
			$dataall=json_decode($datalist);
			if (is_array($dataall)){
				//print_r($dataall);
				$newarr=array();
				foreach($dataall as $adata){
					//each loop 1 record
					$arr1=array();
					 
                    $data1=array();
					foreach($adata as $k => $v) {
					    $data1['GajiDetail3'][$k]=$v;
                        $arr1[$k]=$v;
						 
                       
					}
                    $data1['GajiDetail3']['gm_id']=$masterid;
                    $data1['GajiDetail3']['src_code']=null;
                   
				 	$detail->primaryKey="gd_id";
					try {
						if ($detail->save($data1)){
							    if ($data1['GajiDetail3']['gd_id']=="0")
								    $arr1["gd_id"]=($detail->getLastInsertID());
								$arr1["gm_id"]=$masterid;
							 

						}
					}
					catch(exception $e)
					{
					 	$acum_msg=$acum_msg.' '.$e->getMessage();
					  
					}
					$newarr[]=$arr1;
					 

				}
				$success='true';
				if ($acum_msg==''){
					$acum_msg='Successfully created records...';
				}
				else {
					$acum_msg='There are some error : '.$acum_msg;
					$success='false';
				}
				$this->set('success', '{"success":'.$success.',"message":'.json_encode($acum_msg).',"data":'.json_encode($newarr).'}');

			}
			else {
				//echo "no array";

				 
					$arr1=array();

					$newdata=false;
                    $data1=array();
					foreach($dataall as $k => $v) {
					   $data1['GajiDetail3'][$k]=$v;
                        $arr1[$k]=$v;
                       
					}
                    $data1['GajiDetail3']['src_code']=null;
                    $data1['GajiDetail3']['gm_id']=$masterid;
				  
					$detail->primaryKey="gd_id";
					try{
						if ($detail->save($data1)){
						        if ($data1['GajiDetail3']['gd_id']=="0")
                                    $arr1["gd_id"]=($detail->getLastInsertID());  
								 
								 $arr1["gm_id"]=$masterid;
						 }
					}
					catch(exception $e)
					{
					 	$acum_msg=$acum_msg.' '.$e->getMessage();
					  
					}
					$success='true';
					if ($acum_msg==''){
						$acum_msg='Successfully created records...';
					}
					else {
						$acum_msg='There are some error : '.$acum_msg;
						$success='false';
					}
					$this->set('success', '{"success":'.$success.',"message":'.json_encode($acum_msg).',"data":'.json_encode($arr1).'}');

			}
		}
		else {
			$this->set('success', '{"success":false,"message":"No Data"}');

		}
	 }
function updatedetail_3(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',1);
		App::import('Model','gajidetail3');
		$detail=new GajiDetail3;
		$this->layout='ajax';
		$datalist='';
		$masterid=0;
		$acum_msg='';
		if(isset($_POST['data']))
			$datalist = $_POST['data'];


		if(!empty($_POST['master']))
			$masterid= $_POST['master'];
		if ($datalist!='' && $masterid!=''){
			$dataall=json_decode($datalist);
			if (is_array($dataall)){
				//print_r($dataall);
				$newarr=array();
				foreach($dataall as $adata){
					//each loop 1 record
					$arr1=array();
					 
                    $data1=array();
                    foreach($adata as $k => $v) {
                        $data1['GajiDetail3'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['GajiDetail3']['gm_id']=$masterid;
                    $data1['GajiDetail3']['src_code']=null;
                   
                    $detail->primaryKey="gd_id";
                    try {
                        if ($detail->save($data1)){
                            if ($data1['GajiDetail3']['gd_id']=="0")
                                    $arr1["gd_id"]=($detail->getLastInsertID());
                            $arr1["gm_id"]=$masterid;
							 
						}
					}
					catch(exception $e)
					{
					 	$acum_msg=$acum_msg.' '.$e->getMessage();
					  
					}
					$newarr[]=$arr1;
					 
				}
				//print_r($newarr);
				//echo json_encode($newarr);
				
				$success='true';
				if ($acum_msg==''){
					$acum_msg='Successfully update records...';
				}
				else {
					$acum_msg='There are some error : '.$acum_msg;
				    $success='false'; 
				}
				$this->set('success', '{"success":'.$success.',"message":'.json_encode($acum_msg).',"data":'.json_encode($newarr).'}');


			}
			else {
				//echo "no array";

					 
					$arr1=array();

					$newdata=false;
					foreach($adata as $k => $v) {
                        $data1['GajiDetail3'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['GajiDetail3']['gm_id']=$masterid;
                    $data1['GajiDetail3']['src_code']=null;
                   
                    $detail->primaryKey="gd_id";
                    try {
                        if ($detail->save($data1)){
								  if ($data1['GajiDetail3']['gd_id']=="0")
                                    $arr1["gd_id"]=($detail->getLastInsertID());
								 $arr1["gm_id"]=$masterid;
	
						}
					}
					catch(exception $e)
					{
					 	$acum_msg=$acum_msg.' '.$e->getMessage();
					  
					}
					 
					$success=true;
					if ($acum_msg==''){
						$acum_msg='Successfully created records...';
					}
					else {
						$acum_msg='There are some error : '.$acum_msg;
						$success=false;
					}
					$this->set('success', '{"success":'.$success.',"message":'.json_encode($acum_msg).',"data":'.json_encode($arr1).'}');


			}
		}
		else {
			$this->set('success', '{"success":false,"message":"Tidak ada data untuk disimpan"}');

		}
	 }
	function destroydetail_3(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',1);
		$this->layout='ajax';
		App::import('Model','gajidetail3');
		$detail=new GajiDetail3();
		$datalist='';
		$masterid=0;
		$acum_msg='';
		if(isset($_POST['data']))
			$datalist = $_POST['data'];


		if(isset($_POST['master']))
			$masterid= $_POST['master'];
		if ($datalist!='' && $masterid!=''){
			$dataall=json_decode($datalist);
			foreach ($dataall as $dataid){
				$detail->primaryKey='gd_id';
				try {
					$detail->delete($dataid);
				}
				catch(exception $e)
				{
				 	$acum_msg=$acum_msg.' '.$e->getMessage();
				  
				}
			}
				$success='true';
				if ($acum_msg==''){
					$acum_msg='Successfully update records...';
				}
				else {
					$acum_msg='There are some error : '.$acum_msg;
					$success='false';
				}
				$this->set('success', '{"success":'.$success.',"message":'.json_encode($acum_msg).',"data":[]}');

			 

		}
		else {
			$this->set('success', '{"success":false,"message":"Tidak ada data untuk disimpan"}');

		}
	}
}
?>