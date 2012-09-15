<?php
class SpdperController extends AppController
{
    var $name = 'spdper';
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
		App::import('Model','spdpermasterlist');
		$master=new SpdperMasterList();
		 
		if ($key!=""){
			$key=strtolower($key);
		
			$whereis=array('conditions'=> 
											array('AND'=>array(array('lower(SpdperMasterList.spdm_no)' =>"$key"))),
										'order'=>'SpdperMasterList.spdm_no','limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>array(array('lower(SpdperMasterList.spdm_no) '=>"$key") )) );
			$dataAll=$master->find('all',$whereis);
			$count=$master->find('count',$wherecount);
		}
		else {
			$dataAll=$master->find('all' ,array('conditions'=>array('SpdperMasterList.spdm_no'=>"$key"),'limit'=>$limit,'page'=>$page));
			$count=$master->find('count',array('conditions'=>array('SpdperMasterList.spdm_no'=>"$key")));
		}
		$dataAll = Set::extract($dataAll,'{n}.SpdperMasterList');
		$this->set('dataAll','{"total":'.$count.',"spdpermasters":'.json_encode($dataAll).'}');
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
		App::import('Model','spdpermasterlist');
		$master=new SpdperMasterList();
		$un_id="";
		if(isset($_POST['un_id']))
			$un_id= $_POST['un_id']; 
		if ($key!=""){
			$key=strtolower($key);
		
			$whereis=array('conditions'=> array('AND'=>array(array('lower(SpdperMasterList.spdm_no) LIKE '=>"%$key%") )),
											array('AND'=>array(array('SpdperMasterList.un_id' =>$un_id))),
										'order'=>'SpdperMasterList.spdm_no','limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>array(array('lower(SpdperMasterList.spdm_no) LIKE '=>"%$key%") )),
												array('AND'=>array(array('SpdperMasterList.un_id' =>$un_id))));
			$dataAll=$master->find('all',$whereis);
			$count=$master->find('count',$wherecount);
		}
		else {
			$dataAll=$master->find('all' ,array('conditions'=>array('SpdperMasterList.un_id'=>$un_id),'limit'=>$limit,'page'=>$page));
			$count=$master->find('count',array('conditions'=>array('SpdperMasterList.un_id'=>$un_id)));
		}
		$dataAll = Set::extract($dataAll,'{n}.SpdperMasterList');
		$this->set('dataAll','{"total":'.$count.',"spdpermasters":'.json_encode($dataAll).'}');
	}  
	function adddetail0(){
		Configure::write('debug',2);
		set_error_handler(array($this, 'handleError'));
		$this->layout = 'ajax';
			if ($this->data['SpdperDetail0']['dpam_no']!=''){
				$this->data['SpdperDetail0']['spdd_nilai']=r(',','',$this->data['SpdperDetail0']['spdd_nilai']); 
				$this->data['SpdperDetail0']['spdd_tersedia']=r(',','',$this->data['SpdperDetail0']['spdd_tersedia']); 
				$this->data['SpdperDetail0']['spdd_sisa']=r(',','',$this->data['SpdperDetail0']['spdd_sisa']); 
				$this->data['SpdperDetail0']['spdd_angg']=r(',','',$this->data['SpdperDetail0']['spdd_angg']); 
				App::import('Model','spdperdetail0');
				$detail0=new SpdperDetail0;
				$check0=$detail0->findBySpdm_id($this->data['SpdperDetail0']['spdm_id']);
				if(!empty($check0)){
					$detail0->spdd_id=$check0['SpdperDetail0']['spdd_id'];
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
		if(isset($_REQUEST['spdm_id']))
			$master_id = $_REQUEST['spdm_id'];
		else $master_id="";
		 
		App::import('Model','spdperdetail0');
		$detail=new SpdperDetail0();
		 
		$dataAll=$detail->find('all' ,array('conditions'=>array('spdm_id'=>$master_id),'order'=>'spdd_id','limit'=>1));
		$count=$detail->find('count',array('conditions'=>array('spdm_id'=>$master_id)));
		 
		$dataAll = Set::extract($dataAll,'{n}.SpdperDetail0');
		$this->set('dataAll','{"total":'.$count.',"spdperdetails":'.json_encode($dataAll).'}');
	}  
	 function add(){
		Configure::write('debug',2);
		set_error_handler(array($this, 'handleError'));
		$this->layout = 'ajax';
		App::import('Model','spdpermaster');
		$spdpermaster=new SpdperMaster;
	 
		if (!empty($this->data)) {
			    $admin=$this->Session->read('PB_USER_SESSION');

			  
				//check if user exists
				$this->data['SpdperMaster']['spdm_angg']=r(',','',$this->data['SpdperMaster']['spdm_angg']);
				$this->data['SpdperMaster']['spdm_akum']=r(',','',$this->data['SpdperMaster']['spdm_akum']);
				$this->data['SpdperMaster']['spdm_tersedia']=r(',','',$this->data['SpdperMaster']['spdm_tersedia']);
				$this->data['SpdperMaster']['spdm_total']=r(',','',$this->data['SpdperMaster']['spdm_total']);
				$this->data['SpdperMaster']['spdm_sisa']=r(',','',$this->data['SpdperMaster']['spdm_sisa']);
			 
				$checkdata=$spdpermaster->findBySpdm_id($this->data['SpdperMaster']['spdm_id']);
				 if (empty($checkdata)) {
				 
					$spdpermaster->create();
				 }
				 else {
				 	$spdpermaster->spdm_id=$this->data['SpdperMaster']['spdm_id'];
				 }
				 
					try {
						if ($spdpermaster->save($this->data)) {
						//	$newid=$salesmaster->getLastInsertID();
						if (isset($spdpermaster->spdm_id)) $newid=$spdpermaster->spdm_id;
						else $newid=$spdpermaster->getLastInsertID();
							//
							#checkdetail0
							
							$newno=$this->data['SpdperMaster']['spdm_no'];
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
		App::import('Model','spdpermasterlist');
		$spdpermasterlist=new SpdperMasterList;
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
					array('lower(spdm_no)  LIKE' => "%$search%"),
					array('lower(un_kode) LIKE' =>"%$search%"),
					array('lower(un_nama) LIKE' =>"%$search%") 
				 )) 
			),
			'order'=> 'SpdperMasterList.spdm_tgl asc' ,'limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>
				array('OR'=>array(
						array('lower(spdm_no)  LIKE' => "%$search%"),
					array('lower(un_kode) LIKE' =>"%$search%"),
					array('lower(un_nama) LIKE' =>"%$search%") )) 
			));
		}
		else {
	  		$whereis=array(  'order'=>'SpdperMasterList.spdm_tgl asc','limit'=>$limit,'page'=>$page);
			$wherecount=array();
		}
		$dataAll=$spdpermasterlist->find('all',$whereis);
		$count=$spdpermasterlist->find('count',$wherecount);
 		 $this->set('dataAll','{"total":'.$count.',"spdpermasters":'.json_encode($dataAll).'}');

	}
	 
  	function readdetail_btl($form_no=0){
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','spdperdetail2list');
		$detaillist=new SpdperDetail2List;
		$mid=0;
		if(isset($_POST['spdm_id']))
			$mid = $_POST['spdm_id'];
		$dataall=$detaillist->find('all',array('conditions'=>array('spdm_id'=>$mid),'order'=>'akun_kode'));
		$count=$detaillist->find('count',array('conditions'=>array('spdm_id'=>$mid)));
		 $results = Set::extract($dataall,'{n}.SpdperDetail2List');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	function createdetail_btl(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		$this->layout='ajax';
			App::import('Model','spdperdetail2');
		$detail=new SpdperDetail2;
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
					    $data1['SpdperDetail2'][$k]=$v;
                        $arr1[$k]=$v;
						 
                       
					}
                    $data1['SpdperDetail2']['spdm_id']=$masterid;
                    $data1['SpdperDetail2']['src_code']=null;
                   
				 	$detail->primaryKey="spdd_id";
					try {
						if ($detail->save($data1)){
							    if ($data1['SpdperDetail2']['spdd_id']=="0")
								    $arr1["spdd_id"]=($detail->getLastInsertID());
								$arr1["spdm_id"]=$masterid;
							 

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
					   $data1['SpdperDetail2'][$k]=$v;
                        $arr1[$k]=$v;
                       
					}
                    $data1['SpdperDetail2']['src_code']=null;
                    $data1['SpdperDetail2']['spdm_id']=$masterid;
				  
					$detail->primaryKey="spdd_id";
					try{
						if ($detail->save($data1)){
						        if ($data1['SpdperDetail2']['spdd_id']=="0")
                                    $arr1["spdd_id"]=($detail->getLastInsertID());  
								 
								 $arr1["spdm_id"]=$masterid;
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
function updatedetail_btl(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		App::import('Model','spdperdetail2');
		$detail=new SpdperDetail2;
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
                        $data1['SpdperDetail2'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['SpdperDetail2']['spdm_id']=$masterid;
                    $data1['SpdperDetail2']['src_code']=null;
                   
                    $detail->primaryKey="spdd_id";
                    try {
                        if ($detail->save($data1)){
                            if ($data1['SpdperDetail2']['spdd_id']=="0")
                                    $arr1["spdd_id"]=($detail->getLastInsertID());
                            $arr1["spdm_id"]=$masterid;
							 
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
                        $data1['SpdperDetail2'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['SpdperDetail2']['spdm_id']=$masterid;
                    $data1['SpdperDetail2']['src_code']=null;
                   
                    $detail->primaryKey="spdd_id";
                    try {
                        if ($detail->save($data1)){
								  if ($data1['SpdperDetail2']['spdd_id']=="0")
                                    $arr1["spdd_id"]=($detail->getLastInsertID());
								 $arr1["spdm_id"]=$masterid;
	
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
	function destroydetail_btl(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','spdperdetail2');
		$detail=new SpdperDetail2();
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
				$detail->primaryKey='spdd_id';
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

	function readdetail_bl($form_no=0){
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','spdperdetail1list');
		$detaillist=new SpdperDetail1List;
		$mid=0;
		if(isset($_POST['spdm_id']))
			$mid = $_POST['spdm_id'];
		$dataall=$detaillist->find('all',array('conditions'=>array('spdm_id'=>$mid)));
		$count=$detaillist->find('count',array('conditions'=>array('spdm_id'=>$mid)));
		 $results = Set::extract($dataall,'{n}.SpdperDetail1List');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	function createdetail_bl(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		$this->layout='ajax';
			App::import('Model','spdperdetail1');
		$detail=new SpdperDetail1;
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
					    $data1['SpdperDetail1'][$k]=$v;
                        $arr1[$k]=$v;
						 
                       
					}
                    $data1['SpdperDetail1']['spdm_id']=$masterid;
                    $data1['SpdperDetail1']['src_code']=null;
                   
				 	$detail->primaryKey="spdd_id";
					try {
						if ($detail->save($data1)){
							    if ($data1['SpdperDetail1']['spdd_id']=="0")
								    $arr1["spdd_id"]=($detail->getLastInsertID());
								$arr1["spdm_id"]=$masterid;
							 

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
					   $data1['SpdperDetail1'][$k]=$v;
                        $arr1[$k]=$v;
                       
					}
                    $data1['SpdperDetail1']['src_code']=null;
                    $data1['SpdperDetail1']['spdm_id']=$masterid;
				  
					$detail->primaryKey="spdd_id";
					try{
						if ($detail->save($data1)){
						        if ($data1['SpdperDetail1']['spdd_id']=="0")
                                    $arr1["spdd_id"]=($detail->getLastInsertID());  
								 
								 $arr1["spdm_id"]=$masterid;
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
function updatedetail_bl(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		App::import('Model','spdperdetail1');
		$detail=new SpdperDetail1;
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
                        $data1['SpdperDetail1'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['SpdperDetail1']['spdm_id']=$masterid;
                    $data1['SpdperDetail1']['src_code']=null;
                   
                    $detail->primaryKey="spdd_id";
                    try {
                        if ($detail->save($data1)){
                            if ($data1['SpdperDetail1']['spdd_id']=="0")
                                    $arr1["spdd_id"]=($detail->getLastInsertID());
                            $arr1["spdm_id"]=$masterid;
							 
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
                        $data1['Spdperdetail1'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['SpdperDetail1']['spdm_id']=$masterid;
                    $data1['SpdperDetail1']['src_code']=null;
                   
                    $detail->primaryKey="spdd_id";
                    try {
                        if ($detail->save($data1)){
								  if ($data1['SpdperDetail1']['spdd_id']=="0")
                                    $arr1["spdd_id"]=($detail->getLastInsertID());
								 $arr1["spdm_id"]=$masterid;
	
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
	function destroydetail_bl(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','spdperdetail1');
		$detail=new SpdperDetail1();
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
				$detail->primaryKey='spdd_id';
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