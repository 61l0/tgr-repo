<?php
class BansosController extends AppController
{
    var $name = 'bansos';
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
		App::import('Model','bansosmasterlist');
		$master=new BansosMasterList();
		 
		if ($key!=""){
			$key=strtolower($key);
		
			$whereis=array('conditions'=> 
											array('AND'=>array(array('lower(BansosMasterList.bm_no)' =>"$key"))),
										'order'=>'BansosMasterList.bm_no','limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>array(array('lower(BansosMasterList.bm_no) '=>"$key") )) );
			$dataAll=$master->find('all',$whereis);
			$count=$master->find('count',$wherecount);
		}
		else {
			$dataAll=$master->find('all' ,array('conditions'=>array('BansosMasterList.bm_no'=>"$key"),'limit'=>$limit,'page'=>$page));
			$count=$master->find('count',array('conditions'=>array('BansosMasterList.bm_no'=>"$key")));
		}
		$dataAll = Set::extract($dataAll,'{n}.BansosMasterList');
		$this->set('dataAll','{"total":'.$count.',"bansosmasters":'.json_encode($dataAll).'}');
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
		App::import('Model','bansosmasterlist');
		$master=new BansosMasterList();
		$un_id="";
		if(isset($_POST['un_id']))
			$un_id= $_POST['un_id']; 
		if ($key!=""){
			$key=strtolower($key);
		
			$whereis=array('conditions'=> array('AND'=>array(array('lower(BansosMasterList.bm_no) LIKE '=>"%$key%") )),
											array('AND'=>array(array('BansosMasterList.un_id' =>$un_id))),
										'order'=>'BansosMasterList.bm_no','limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>array(array('lower(BansosMasterList.bm_no) LIKE '=>"%$key%") )),
												array('AND'=>array(array('BansosMasterList.un_id' =>$un_id))));
			$dataAll=$master->find('all',$whereis);
			$count=$master->find('count',$wherecount);
		}
		else {
			$dataAll=$master->find('all' ,array('conditions'=>array('BansosMasterList.un_id'=>$un_id),'limit'=>$limit,'page'=>$page));
			$count=$master->find('count',array('conditions'=>array('BansosMasterList.un_id'=>$un_id)));
		}
		$dataAll = Set::extract($dataAll,'{n}.BansosMasterList');
		$this->set('dataAll','{"total":'.$count.',"bansosmasters":'.json_encode($dataAll).'}');
	}  
	function adddetail0(){
		Configure::write('debug',2);
		set_error_handler(array($this, 'handleError'));
		$this->layout = 'ajax';
			if ($this->data['BansosDetail0']['dpbm_no']!=''){
				$this->data['BansosDetail0']['bd_nilai']=r(',','',$this->data['BansosDetail0']['bd_nilai']); 
				$this->data['BansosDetail0']['bd_tersedia']=r(',','',$this->data['BansosDetail0']['bd_tersedia']); 
				$this->data['BansosDetail0']['bd_sisa']=r(',','',$this->data['BansosDetail0']['bd_sisa']); 
				$this->data['BansosDetail0']['bd_angg']=r(',','',$this->data['BansosDetail0']['bd_angg']); 
				App::import('Model','bansosdetail0');
				$detail0=new BansosDetail0;
				$check0=$detail0->findByBansosm_id($this->data['BansosDetail0']['bm_id']);
				if(!empty($check0)){
					$detail0->bd_id=$check0['BansosDetail0']['bd_id'];
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
		if(isset($_REQUEST['bm_id']))
			$master_id = $_REQUEST['bm_id'];
		else $master_id="";
		 
		App::import('Model','bansosdetail0');
		$detail=new BansosDetail0();
		 
		$dataAll=$detail->find('all' ,array('conditions'=>array('bm_id'=>$master_id),'order'=>'bd_id','limit'=>1));
		$count=$detail->find('count',array('conditions'=>array('bm_id'=>$master_id)));
		 
		$dataAll = Set::extract($dataAll,'{n}.BansosDetail0');
		$this->set('dataAll','{"total":'.$count.',"bansosdetails":'.json_encode($dataAll).'}');
	}  
	 function add(){
		Configure::write('debug',2);
		set_error_handler(array($this, 'handleError'));
		$this->layout = 'ajax';
		App::import('Model','bansosmaster');
		$bansosmaster=new BansosMaster;
	 
		if (!empty($this->data)) {
			    $admin=$this->Session->read('PB_USER_SESSION');
			
			   
				$checkdata=$bansosmaster->findByBm_id($this->data['BansosMaster']['bm_id']);
				 if (empty($checkdata)) {
				 
					$bansosmaster->create();
				 }
				 else {
				 	$bansosmaster->bm_id=$this->data['BansosMaster']['bm_id'];
				 }
				 
					try {
						if ($bansosmaster->save($this->data)) {
						//	$newid=$salesmaster->getLastInsertID();
						if (isset($bansosmaster->bm_id)) $newid=$bansosmaster->bm_id;
						else $newid=$bansosmaster->getLastInsertID();
							//
							#checkdetail0
							
							$newno=$this->data['BansosMaster']['bm_no'];
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
		App::import('Model','bansosmasterlist');
		$bansosmasterlist=new BansosMasterList;
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
					array('lower(bm_no)  LIKE' => "%$search%"),
					array('lower(un_kode) LIKE' =>"%$search%"),
					array('lower(un_nama) LIKE' =>"%$search%") 
				 )) 
			),
			'order'=> 'BansosMasterList.bm_tgl asc' ,'limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>
				array('OR'=>array(
						array('lower(bm_no)  LIKE' => "%$search%"),
					array('lower(un_kode) LIKE' =>"%$search%"),
					array('lower(un_nama) LIKE' =>"%$search%") )) 
			));
		}
		else {
	  		$whereis=array(  'order'=>'BansosMasterList.bm_tgl asc','limit'=>$limit,'page'=>$page);
			$wherecount=array();
		}
		$dataAll=$bansosmasterlist->find('all',$whereis);
		$count=$bansosmasterlist->find('count',$wherecount);
 		 $this->set('dataAll','{"total":'.$count.',"bansosmasters":'.json_encode($dataAll).'}');

	}
	 
  	function readdetail_2($form_no=0){
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','bansosdetail2list');
		$detaillist=new BansosDetail2List;
		$mid=0;
		if(isset($_POST['bm_id']))
			$mid = $_POST['bm_id'];
		$dataall=$detaillist->find('all',array('conditions'=>array('bm_id'=>$mid),'order'=>'akun_kode'));
		$count=$detaillist->find('count',array('conditions'=>array('bm_id'=>$mid)));
		 $results = Set::extract($dataall,'{n}.BansosDetail2List');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	function createdetail_2(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		$this->layout='ajax';
			App::import('Model','bansosdetail2');
		$detail=new BansosDetail2;
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
					    $data1['BansosDetail2'][$k]=$v;
                        $arr1[$k]=$v;
						 
                       
					}
                    $data1['BansosDetail2']['bm_id']=$masterid;
                    $data1['BansosDetail2']['src_code']=null;
                   
				 	$detail->primaryKey="bd_id";
					try {
						if ($detail->save($data1)){
							    if ($data1['BansosDetail2']['bd_id']=="0")
								    $arr1["bd_id"]=($detail->getLastInsertID());
								$arr1["bm_id"]=$masterid;
							 

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
					   $data1['BansosDetail2'][$k]=$v;
                        $arr1[$k]=$v;
                       
					}
                    $data1['BansosDetail2']['src_code']=null;
                    $data1['BansosDetail2']['bm_id']=$masterid;
				  
					$detail->primaryKey="bd_id";
					try{
						if ($detail->save($data1)){
						        if ($data1['BansosDetail2']['bd_id']=="0")
                                    $arr1["bd_id"]=($detail->getLastInsertID());  
								 
								 $arr1["bm_id"]=$masterid;
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
		App::import('Model','bansosdetail2');
		$detail=new BansosDetail2;
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
                        $data1['BansosDetail2'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['BansosDetail2']['bm_id']=$masterid;
                    $data1['BansosDetail2']['src_code']=null;
                   
                    $detail->primaryKey="bd_id";
                    try {
                        if ($detail->save($data1)){
                            if ($data1['BansosDetail2']['bd_id']=="0")
                                    $arr1["bd_id"]=($detail->getLastInsertID());
                            $arr1["bm_id"]=$masterid;
							 
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
                        $data1['BansosDetail2'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['BansosDetail2']['bm_id']=$masterid;
                    $data1['BansosDetail2']['src_code']=null;
                   
                    $detail->primaryKey="bd_id";
                    try {
                        if ($detail->save($data1)){
								  if ($data1['BansosDetail2']['bd_id']=="0")
                                    $arr1["bd_id"]=($detail->getLastInsertID());
								 $arr1["bm_id"]=$masterid;
	
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
		App::import('Model','bansosdetail2');
		$detail=new BansosDetail2();
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
				$detail->primaryKey='bd_id';
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
		App::import('Model','bansosdetaillist');
		$detaillist=new BansosDetailList;
		$mid=0;
		if(isset($_POST['bm_id']))
			$mid = $_POST['bm_id'];
		$dataall=$detaillist->find('all',array('conditions'=>array('bm_id'=>$mid)));
		$count=$detaillist->find('count',array('conditions'=>array('bm_id'=>$mid)));
		 $results = Set::extract($dataall,'{n}.BansosDetailList');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	function createdetail_1(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		$this->layout='ajax';
			App::import('Model','bansosdetail');
		$detail=new BansosDetail;
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
					    $data1['BansosDetail'][$k]=$v;
                        $arr1[$k]=$v;
						 
                       
					}
                    $data1['BansosDetail']['bm_id']=$masterid;
                    $data1['BansosDetail']['src_code']=null;
                   
				 	$detail->primaryKey="bd_id";
					try {
						if ($detail->save($data1)){
							    if ($data1['BansosDetail']['bd_id']=="0")
								    $arr1["bd_id"]=($detail->getLastInsertID());
								$arr1["bm_id"]=$masterid;
							 

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
					   $data1['BansosDetail'][$k]=$v;
                        $arr1[$k]=$v;
                       
					}
                    $data1['BansosDetail']['src_code']=null;
                    $data1['BansosDetail']['bm_id']=$masterid;
				  
					$detail->primaryKey="bd_id";
					try{
						if ($detail->save($data1)){
						        if ($data1['BansosDetail']['bd_id']=="0")
                                    $arr1["bd_id"]=($detail->getLastInsertID());  
								 
								 $arr1["bm_id"]=$masterid;
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
		App::import('Model','bansosdetail');
		$detail=new BansosDetail;
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
                        $data1['BansosDetail'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['BansosDetail']['bm_id']=$masterid;
                    $data1['BansosDetail']['src_code']=null;
                   
                    $detail->primaryKey="bd_id";
                    try {
                        if ($detail->save($data1)){
                            if ($data1['BansosDetail']['bd_id']=="0")
                                    $arr1["bd_id"]=($detail->getLastInsertID());
                            $arr1["bm_id"]=$masterid;
							 
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
                        $data1['Bansosdetail'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['BansosDetail']['bm_id']=$masterid;
                    $data1['BansosDetail']['src_code']=null;
                   
                    $detail->primaryKey="bd_id";
                    try {
                        if ($detail->save($data1)){
								  if ($data1['BansosDetail']['bd_id']=="0")
                                    $arr1["bd_id"]=($detail->getLastInsertID());
								 $arr1["bm_id"]=$masterid;
	
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
		App::import('Model','bansosdetail');
		$detail=new BansosDetail();
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
				$detail->primaryKey='bd_id';
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