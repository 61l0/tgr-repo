<?php
class SpmController extends AppController
{
    var $name = 'spm';
	var $uses=null;
	
	function index()
    {
		
     	
    }
	 function readdetail_1_byno($form_no=0){
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','spmdetail1list');
		$detaillist=new SpmDetail1List;
		$mid=0;
		if(isset($_POST['spmm_no']))
			$mid = $_POST['spmm_no'];
		$dataall=$detaillist->find('all',array('conditions'=>array('spmm_no'=>$mid)));
		$count=$detaillist->find('count',array('conditions'=>array('spmm_no'=>$mid)));
		 $results = Set::extract($dataall,'{n}.SpmDetail1List');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	 function readdetail_2_byno($form_no=0){
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','spmdetail2list');
		$detaillist=new SpmDetail2List;
		$mid=0;
		if(isset($_POST['spmm_no']))
			$mid = $_POST['spmm_no'];
		$dataall=$detaillist->find('all',array('conditions'=>array('spmm_no'=>$mid),'order'=>'pjk_kode'));
		$count=$detaillist->find('count',array('conditions'=>array('spmm_no'=>$mid)));
		 $results = Set::extract($dataall,'{n}.SpmDetail2List');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	 function readdetail_3_byno($form_no=0){
		Configure::write('debug',3);
		$this->layout='ajax';
		App::import('Model','spmdetail3list');
		$detaillist=new SpmDetail3List;
		$mid=0;
		if(isset($_POST['spmm_no']))
			$mid = $_POST['spmm_no'];
		$dataall=$detaillist->find('all',array('conditions'=>array('spmm_no'=>$mid),'order'=>'akun_kode'));
		$count=$detaillist->find('count',array('conditions'=>array('spmm_no'=>$mid)));
		 $results = Set::extract($dataall,'{n}.SpmDetail3List');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	function searchspm(){
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
		App::import('Model','spmmasterlist');
		$master=new SpmMasterList();
		$un_id="";
		if(isset($_POST['un_id']))
			$un_id= $_POST['un_id']; 
		if ($key!=""){
			$key=strtolower($key);
		
			$whereis=array('conditions'=> array('AND'=>array(array('lower(SpmMasterList.spmm_no) LIKE '=>"%$key%") )) ,
										'order'=>'SpmMasterList.sppm_no','limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>array(array('lower(SpmMasterList.spmm_no) LIKE '=>"%$key%") )) );
			$dataAll=$master->find('all',$whereis);
			$count=$master->find('count',$wherecount);
		}
		else {
			$dataAll=$master->find('all' ,array( 'limit'=>$limit,'page'=>$page));
			$count=$master->find('count');
		}
		$dataAll = Set::extract($dataAll,'{n}.SpmMasterList');
		$this->set('dataAll','{"total":'.$count.',"spmmasters":'.json_encode($dataAll).'}');
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
		App::import('Model','spmmasterlist');
		$master=new SpmMasterList();
		 
		if ($key!=""){
			$key=strtolower($key);
		
			$whereis=array('conditions'=> 
											array('AND'=>array(array('lower(SpmMasterList.spmm_no)' =>"$key"))),
										'order'=>'SpmMasterList.spmm_no','limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>array(array('lower(SpmMasterList.spmm_no) '=>"$key") )) );
			$dataAll=$master->find('all',$whereis);
			$count=$master->find('count',$wherecount);
		}
		else {
			$dataAll=$master->find('all' ,array('conditions'=>array('SpmMasterList.spmm_no'=>"$key"),'limit'=>$limit,'page'=>$page));
			$count=$master->find('count',array('conditions'=>array('SpmMasterList.spmm_no'=>"$key")));
		}
		$dataAll = Set::extract($dataAll,'{n}.SpmMasterList');
		$this->set('dataAll','{"total":'.$count.',"spmmasters":'.json_encode($dataAll).'}');
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
		App::import('Model','spmmasterlist');
		$master=new SpmMasterList();
		$un_id="";
		if(isset($_POST['un_id']))
			$un_id= $_POST['un_id']; 
		if ($key!=""){
			$key=strtolower($key);
		
			$whereis=array('conditions'=> array('AND'=>array(array('lower(SpmMasterList.spmm_no) LIKE '=>"%$key%") )),
											array('AND'=>array(array('SpmMasterList.un_id' =>$un_id))),
										'order'=>'SpmMasterList.spmm_no','limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>array(array('lower(SpmMasterList.spmm_no) LIKE '=>"%$key%") )),
												array('AND'=>array(array('SpmMasterList.un_id' =>$un_id))));
			$dataAll=$master->find('all',$whereis);
			$count=$master->find('count',$wherecount);
		}
		else {
			$dataAll=$master->find('all' ,array('conditions'=>array('SpmMasterList.un_id'=>$un_id),'limit'=>$limit,'page'=>$page));
			$count=$master->find('count',array('conditions'=>array('SpmMasterList.un_id'=>$un_id)));
		}
		$dataAll = Set::extract($dataAll,'{n}.SpmMasterList');
		$this->set('dataAll','{"total":'.$count.',"spmmasters":'.json_encode($dataAll).'}');
	}  
	function adddetail3(){
		Configure::write('debug',2);
		set_error_handler(array($this, 'handleError'));
		$this->layout = 'ajax';
			if ($this->data['SpmDetail0']['dpam_no']!=''){
				$this->data['SpmDetail0']['spmd_nilai']=r(',','',$this->data['SpmDetail0']['spmd_nilai']); 
				$this->data['SpmDetail0']['spmd_tersedia']=r(',','',$this->data['SpmDetail0']['spmd_tersedia']); 
				$this->data['SpmDetail0']['spmd_sisa']=r(',','',$this->data['SpmDetail0']['spmd_sisa']); 
				$this->data['SpmDetail0']['spmd_angg']=r(',','',$this->data['SpmDetail0']['spmd_angg']); 
				App::import('Model','spmdetail3');
				$detail3=new SpmDetail0;
				$check0=$detail3->findBySpdm_id($this->data['SpmDetail0']['spmm_id']);
				if(!empty($check0)){
					$detail3->spmd_id=$check0['SpmDetail0']['spmd_id'];
				}
				else {
					$detail3->create();
				}
				$detail3->save($this->data);
			}
			$this->set('success', '{success:true}');
	}
	 
	function getdetail3(){
		Configure::write('debug',1);
		$this->layout = 'ajax';
		$limit=10;$start=0;
		if(isset($_REQUEST['spmm_id']))
			$master_id = $_REQUEST['spmm_id'];
		else $master_id="";
		 
		App::import('Model','spmdetail3');
		$detail=new SpmDetail0();
		 
		$dataAll=$detail->find('all' ,array('conditions'=>array('spmm_id'=>$master_id),'order'=>'spmd_id','limit'=>1));
		$count=$detail->find('count',array('conditions'=>array('spmm_id'=>$master_id)));
		 
		$dataAll = Set::extract($dataAll,'{n}.SpmDetail0');
		$this->set('dataAll','{"total":'.$count.',"spmdetails":'.json_encode($dataAll).'}');
	}  
	 function add(){
		Configure::write('debug',2);
		set_error_handler(array($this, 'handleError'));
		$this->layout = 'ajax';
		App::import('Model','spmmaster');
		$spmmaster=new SpmMaster;
	 
		if (!empty($this->data)) {
			    $admin=$this->Session->read('PB_USER_SESSION');

			 
				$checkdata=$spmmaster->findBySpmm_id($this->data['SpmMaster']['spmm_id']);
				 if (empty($checkdata)) {
				 
					$spmmaster->create();
				 }
				 else {
				 	$spmmaster->spmm_id=$this->data['SpmMaster']['spmm_id'];
				 }
				 $this->data['SpmMaster']['spmm_total']=r(',','',$this->data['SpmMaster']['spmm_total']);
					try {
						if ($spmmaster->save($this->data)) {
						//	$newid=$salesmaster->getLastInsertID();
						if (isset($spmmaster->spmm_id)) $newid=$spmmaster->spmm_id;
						else $newid=$spmmaster->getLastInsertID();
							//
							#checkdetail3
							
							$newno=$this->data['SpmMaster']['spmm_no'];
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
		App::import('Model','spmmasterlist');
		$spmmasterlist=new SpmMasterList;
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
					array('lower(spmm_no)  LIKE' => "%$search%"),
					array('lower(un_kode) LIKE' =>"%$search%"),
					array('lower(un_nama) LIKE' =>"%$search%") 
				 )) 
			),
			'order'=> 'SpmMasterList.spmm_tgl asc' ,'limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>
				array('OR'=>array(
						array('lower(spmm_no)  LIKE' => "%$search%"),
					array('lower(un_kode) LIKE' =>"%$search%"),
					array('lower(un_nama) LIKE' =>"%$search%") )) 
			));
		}
		else {
	  		$whereis=array(  'order'=>'SpmMasterList.spmm_tgl asc','limit'=>$limit,'page'=>$page);
			$wherecount=array();
		}
		$dataAll=$spmmasterlist->find('all',$whereis);
		$count=$spmmasterlist->find('count',$wherecount);
 		 $this->set('dataAll','{"total":'.$count.',"spmmasters":'.json_encode($dataAll).'}');

	}
	 
  	function readdetail_2($form_no=0){
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','spmdetail2list');
		$detaillist=new SpmDetail2List;
		$mid=0;
		if(isset($_POST['spmm_id']))
			$mid = $_POST['spmm_id'];
		$dataall=$detaillist->find('all',array('conditions'=>array('spmm_id'=>$mid),'order'=>'pjk_kode'));
		$count=$detaillist->find('count',array('conditions'=>array('spmm_id'=>$mid)));
		 $results = Set::extract($dataall,'{n}.SpmDetail2List');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	function createdetail_2(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		$this->layout='ajax';
			App::import('Model','spmdetail2');
		$detail=new SpmDetail2;
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
					    $data1['SpmDetail2'][$k]=$v;
                        $arr1[$k]=$v;
						 
                       
					}
                    $data1['SpmDetail2']['spmm_id']=$masterid;
                    $data1['SpmDetail2']['src_code']=null;
                   
				 	$detail->primaryKey="spmd_id";
					try {
						if ($detail->save($data1)){
							    if ($data1['SpmDetail2']['spmd_id']=="0")
								    $arr1["spmd_id"]=($detail->getLastInsertID());
								$arr1["spmm_id"]=$masterid;
							 

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
					   $data1['SpmDetail2'][$k]=$v;
                        $arr1[$k]=$v;
                       
					}
                    $data1['SpmDetail2']['src_code']=null;
                    $data1['SpmDetail2']['spmm_id']=$masterid;
				  
					$detail->primaryKey="spmd_id";
					try{
						if ($detail->save($data1)){
						        if ($data1['SpmDetail2']['spmd_id']=="0")
                                    $arr1["spmd_id"]=($detail->getLastInsertID());  
								 
								 $arr1["spmm_id"]=$masterid;
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
		App::import('Model','spmdetail2');
		$detail=new SpmDetail2;
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
                        $data1['SpmDetail2'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['SpmDetail2']['spmm_id']=$masterid;
                    $data1['SpmDetail2']['src_code']=null;
                   
                    $detail->primaryKey="spmd_id";
                    try {
                        if ($detail->save($data1)){
                            if ($data1['SpmDetail2']['spmd_id']=="0")
                                    $arr1["spmd_id"]=($detail->getLastInsertID());
                            $arr1["spmm_id"]=$masterid;
							 
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
                        $data1['SpmDetail2'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['SpmDetail2']['spmm_id']=$masterid;
                    $data1['SpmDetail2']['src_code']=null;
                   
                    $detail->primaryKey="spmd_id";
                    try {
                        if ($detail->save($data1)){
								  if ($data1['SpmDetail2']['spmd_id']=="0")
                                    $arr1["spmd_id"]=($detail->getLastInsertID());
								 $arr1["spmm_id"]=$masterid;
	
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
		App::import('Model','spmdetail2');
		$detail=new SpmDetail2();
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
				$detail->primaryKey='spmd_id';
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
///----- BL

	function readdetail_1($form_no=0){
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','spmdetail1list');
		$detaillist=new SpmDetail1List;
		$mid=0;
		if(isset($_POST['spmm_id']))
			$mid = $_POST['spmm_id'];
		$dataall=$detaillist->find('all',array('conditions'=>array('spmm_id'=>$mid)));
		$count=$detaillist->find('count',array('conditions'=>array('spmm_id'=>$mid)));
		 $results = Set::extract($dataall,'{n}.SpmDetail1List');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	function createdetail_1(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		$this->layout='ajax';
			App::import('Model','spmdetail1');
		$detail=new SpmDetail1;
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
					    $data1['SpmDetail1'][$k]=$v;
                        $arr1[$k]=$v;
						 
                       
					}
                    $data1['SpmDetail1']['spmm_id']=$masterid;
                    $data1['SpmDetail1']['src_code']=null;
                   
				 	$detail->primaryKey="spmd_id";
					try {
						if ($detail->save($data1)){
							    if ($data1['SpmDetail1']['spmd_id']=="0")
								    $arr1["spmd_id"]=($detail->getLastInsertID());
								$arr1["spmm_id"]=$masterid;
							 

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
					   $data1['SpmDetail1'][$k]=$v;
                        $arr1[$k]=$v;
                       
					}
                    $data1['SpmDetail1']['src_code']=null;
                    $data1['SpmDetail1']['spmm_id']=$masterid;
				  
					$detail->primaryKey="spmd_id";
					try{
						if ($detail->save($data1)){
						        if ($data1['SpmDetail1']['spmd_id']=="0")
                                    $arr1["spmd_id"]=($detail->getLastInsertID());  
								 
								 $arr1["spmm_id"]=$masterid;
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
		App::import('Model','spmdetail1');
		$detail=new SpmDetail1;
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
                        $data1['SpmDetail1'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['SpmDetail1']['spmm_id']=$masterid;
                    $data1['SpmDetail1']['src_code']=null;
                   
                    $detail->primaryKey="spmd_id";
                    try {
                        if ($detail->save($data1)){
                            if ($data1['SpmDetail1']['spmd_id']=="0")
                                    $arr1["spmd_id"]=($detail->getLastInsertID());
                            $arr1["spmm_id"]=$masterid;
							 
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
                        $data1['Spmdetail1'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['SpmDetail1']['spmm_id']=$masterid;
                    $data1['SpmDetail1']['src_code']=null;
                   
                    $detail->primaryKey="spmd_id";
                    try {
                        if ($detail->save($data1)){
								  if ($data1['SpmDetail1']['spmd_id']=="0")
                                    $arr1["spmd_id"]=($detail->getLastInsertID());
								 $arr1["spmm_id"]=$masterid;
	
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
		App::import('Model','spmdetail1');
		$detail=new SpmDetail1();
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
				$detail->primaryKey='spmd_id';
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


  	function readdetail_3($form_no=0){
		Configure::write('debug',3);
		$this->layout='ajax';
		App::import('Model','spmdetail3list');
		$detaillist=new SpmDetail3List;
		$mid=0;
		if(isset($_POST['spmm_id']))
			$mid = $_POST['spmm_id'];
		$dataall=$detaillist->find('all',array('conditions'=>array('spmm_id'=>$mid),'order'=>'akun_kode'));
		$count=$detaillist->find('count',array('conditions'=>array('spmm_id'=>$mid)));
		 $results = Set::extract($dataall,'{n}.SpmDetail3List');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	function createdetail_3(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',3);
		$this->layout='ajax';
			App::import('Model','spmdetail3');
		$detail=new SpmDetail3;
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
					    $data1['SpmDetail3'][$k]=$v;
                        $arr1[$k]=$v;
						 
                       
					}
                    $data1['SpmDetail3']['spmm_id']=$masterid;
                    $data1['SpmDetail3']['src_code']=null;
                   
				 	$detail->primaryKey="spmd_id";
					try {
						if ($detail->save($data1)){
							    if ($data1['SpmDetail3']['spmd_id']=="0")
								    $arr1["spmd_id"]=($detail->getLastInsertID());
								$arr1["spmm_id"]=$masterid;
							 

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
					   $data1['SpmDetail3'][$k]=$v;
                        $arr1[$k]=$v;
                       
					}
                    $data1['SpmDetail3']['src_code']=null;
                    $data1['SpmDetail3']['spmm_id']=$masterid;
				  
					$detail->primaryKey="spmd_id";
					try{
						if ($detail->save($data1)){
						        if ($data1['SpmDetail3']['spmd_id']=="0")
                                    $arr1["spmd_id"]=($detail->getLastInsertID());  
								 
								 $arr1["spmm_id"]=$masterid;
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
		Configure::write('debug',3);
		App::import('Model','spmdetail3');
		$detail=new SpmDetail3;
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
                        $data1['SpmDetail3'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['SpmDetail3']['spmm_id']=$masterid;
                    $data1['SpmDetail3']['src_code']=null;
                   
                    $detail->primaryKey="spmd_id";
                    try {
                        if ($detail->save($data1)){
                            if ($data1['SpmDetail3']['spmd_id']=="0")
                                    $arr1["spmd_id"]=($detail->getLastInsertID());
                            $arr1["spmm_id"]=$masterid;
							 
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
                        $data1['SpmDetail3'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['SpmDetail3']['spmm_id']=$masterid;
                    $data1['SpmDetail3']['src_code']=null;
                   
                    $detail->primaryKey="spmd_id";
                    try {
                        if ($detail->save($data1)){
								  if ($data1['SpmDetail3']['spmd_id']=="0")
                                    $arr1["spmd_id"]=($detail->getLastInsertID());
								 $arr1["spmm_id"]=$masterid;
	
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
		Configure::write('debug',3);
		$this->layout='ajax';
		App::import('Model','spmdetail3');
		$detail=new SpmDetail3();
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
				$detail->primaryKey='spmd_id';
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