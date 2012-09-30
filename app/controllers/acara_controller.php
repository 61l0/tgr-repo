<?php
class AcaraController extends AppController
{
    var $name = 'acara';
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
		App::import('Model','acaramasterlist');
		$master=new AcaraMasterList();
		 
		if ($key!=""){
			$key=strtolower($key);
		
			$whereis=array('conditions'=> 
											array('AND'=>array(array('lower(AcaraMasterList.am_no)' =>"$key"))),
										'order'=>'AcaraMasterList.am_no','limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>array(array('lower(AcaraMasterList.am_no) '=>"$key") )) );
			$dataAll=$master->find('all',$whereis);
			$count=$master->find('count',$wherecount);
		}
		else {
			$dataAll=$master->find('all' ,array('conditions'=>array('AcaraMasterList.am_no'=>"$key"),'limit'=>$limit,'page'=>$page));
			$count=$master->find('count',array('conditions'=>array('AcaraMasterList.am_no'=>"$key")));
		}
		$dataAll = Set::extract($dataAll,'{n}.AcaraMasterList');
		$this->set('dataAll','{"total":'.$count.',"acaramasters":'.json_encode($dataAll).'}');
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
		App::import('Model','acaramasterlist');
		$master=new AcaraMasterList();
		$un_id="";
		if(isset($_POST['un_id']))
			$un_id= $_POST['un_id']; 
		if ($key!=""){
			$key=strtolower($key);
		
			$whereis=array('conditions'=> array('AND'=>array(array('lower(AcaraMasterList.am_no) LIKE '=>"%$key%") )),
											array('AND'=>array(array('AcaraMasterList.un_id' =>$un_id))),
										'order'=>'AcaraMasterList.am_no','limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>array(array('lower(AcaraMasterList.am_no) LIKE '=>"%$key%") )),
												array('AND'=>array(array('AcaraMasterList.un_id' =>$un_id))));
			$dataAll=$master->find('all',$whereis);
			$count=$master->find('count',$wherecount);
		}
		else {
			$dataAll=$master->find('all' ,array('conditions'=>array('AcaraMasterList.un_id'=>$un_id),'limit'=>$limit,'page'=>$page));
			$count=$master->find('count',array('conditions'=>array('AcaraMasterList.un_id'=>$un_id)));
		}
		$dataAll = Set::extract($dataAll,'{n}.AcaraMasterList');
		$this->set('dataAll','{"total":'.$count.',"acaramasters":'.json_encode($dataAll).'}');
	}  
	function adddetail0(){
		Configure::write('debug',2);
		set_error_handler(array($this, 'handleError'));
		$this->layout = 'ajax';
			if ($this->data['AcaraDetail0']['dpam_no']!=''){
				$this->data['AcaraDetail0']['ad_nilai']=r(',','',$this->data['AcaraDetail0']['ad_nilai']); 
				$this->data['AcaraDetail0']['ad_tersedia']=r(',','',$this->data['AcaraDetail0']['ad_tersedia']); 
				$this->data['AcaraDetail0']['ad_sisa']=r(',','',$this->data['AcaraDetail0']['ad_sisa']); 
				$this->data['AcaraDetail0']['ad_angg']=r(',','',$this->data['AcaraDetail0']['ad_angg']); 
				App::import('Model','acaradetail0');
				$detail0=new AcaraDetail0;
				$check0=$detail0->findByAcaram_id($this->data['AcaraDetail0']['am_id']);
				if(!empty($check0)){
					$detail0->ad_id=$check0['AcaraDetail0']['ad_id'];
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
		if(isset($_REQUEST['am_id']))
			$master_id = $_REQUEST['am_id'];
		else $master_id="";
		 
		App::import('Model','acaradetail0');
		$detail=new AcaraDetail0();
		 
		$dataAll=$detail->find('all' ,array('conditions'=>array('am_id'=>$master_id),'order'=>'ad_id','limit'=>1));
		$count=$detail->find('count',array('conditions'=>array('am_id'=>$master_id)));
		 
		$dataAll = Set::extract($dataAll,'{n}.AcaraDetail0');
		$this->set('dataAll','{"total":'.$count.',"acaradetails":'.json_encode($dataAll).'}');
	}  
	 function add(){
		Configure::write('debug',2);
		set_error_handler(array($this, 'handleError'));
		$this->layout = 'ajax';
		App::import('Model','acaramaster');
		$acaramaster=new AcaraMaster;
	 
		if (!empty($this->data)) {
			    $admin=$this->Session->read('PB_USER_SESSION');
			
			   
				$checkdata=$acaramaster->findByAm_id($this->data['AcaraMaster']['am_id']);
				 if (empty($checkdata)) {
				 
					$acaramaster->create();
				 }
				 else {
				 	$acaramaster->am_id=$this->data['AcaraMaster']['am_id'];
				 }
				 
					try {
						if ($acaramaster->save($this->data)) {
						//	$newid=$salesmaster->getLastInsertID();
						if (isset($acaramaster->am_id)) $newid=$acaramaster->am_id;
						else $newid=$acaramaster->getLastInsertID();
							//
							#checkdetail0
							
							$newno=$this->data['AcaraMaster']['am_no'];
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
		App::import('Model','acaramasterlist');
		$acaramasterlist=new AcaraMasterList;
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
					array('lower(am_no)  LIKE' => "%$search%"),
					array('lower(un_kode) LIKE' =>"%$search%"),
					array('lower(un_nama) LIKE' =>"%$search%") 
				 )) 
			),
			'order'=> 'AcaraMasterList.am_tgl asc' ,'limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>
				array('OR'=>array(
						array('lower(am_no)  LIKE' => "%$search%"),
					array('lower(un_kode) LIKE' =>"%$search%"),
					array('lower(un_nama) LIKE' =>"%$search%") )) 
			));
		}
		else {
	  		$whereis=array(  'order'=>'AcaraMasterList.am_tgl asc','limit'=>$limit,'page'=>$page);
			$wherecount=array();
		}
		$dataAll=$acaramasterlist->find('all',$whereis);
		$count=$acaramasterlist->find('count',$wherecount);
 		 $this->set('dataAll','{"total":'.$count.',"acaramasters":'.json_encode($dataAll).'}');

	}
	 
  	function readdetail_2($form_no=0){
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','acaradetail2list');
		$detaillist=new AcaraDetail2List;
		$mid=0;
		if(isset($_POST['am_id']))
			$mid = $_POST['am_id'];
		$dataall=$detaillist->find('all',array('conditions'=>array('am_id'=>$mid),'order'=>'akun_kode'));
		$count=$detaillist->find('count',array('conditions'=>array('am_id'=>$mid)));
		 $results = Set::extract($dataall,'{n}.AcaraDetail2List');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	function createdetail_2(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		$this->layout='ajax';
			App::import('Model','acaradetail2');
		$detail=new AcaraDetail2;
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
					    $data1['AcaraDetail2'][$k]=$v;
                        $arr1[$k]=$v;
						 
                       
					}
                    $data1['AcaraDetail2']['am_id']=$masterid;
                    $data1['AcaraDetail2']['src_code']=null;
                   
				 	$detail->primaryKey="ad_id";
					try {
						if ($detail->save($data1)){
							    if ($data1['AcaraDetail2']['ad_id']=="0")
								    $arr1["ad_id"]=($detail->getLastInsertID());
								$arr1["am_id"]=$masterid;
							 

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
					   $data1['AcaraDetail2'][$k]=$v;
                        $arr1[$k]=$v;
                       
					}
                    $data1['AcaraDetail2']['src_code']=null;
                    $data1['AcaraDetail2']['am_id']=$masterid;
				  
					$detail->primaryKey="ad_id";
					try{
						if ($detail->save($data1)){
						        if ($data1['AcaraDetail2']['ad_id']=="0")
                                    $arr1["ad_id"]=($detail->getLastInsertID());  
								 
								 $arr1["am_id"]=$masterid;
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
		App::import('Model','acaradetail2');
		$detail=new AcaraDetail2;
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
                        $data1['AcaraDetail2'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['AcaraDetail2']['am_id']=$masterid;
                    $data1['AcaraDetail2']['src_code']=null;
                   
                    $detail->primaryKey="ad_id";
                    try {
                        if ($detail->save($data1)){
                            if ($data1['AcaraDetail2']['ad_id']=="0")
                                    $arr1["ad_id"]=($detail->getLastInsertID());
                            $arr1["am_id"]=$masterid;
							 
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
                        $data1['AcaraDetail2'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['AcaraDetail2']['am_id']=$masterid;
                    $data1['AcaraDetail2']['src_code']=null;
                   
                    $detail->primaryKey="ad_id";
                    try {
                        if ($detail->save($data1)){
								  if ($data1['AcaraDetail2']['ad_id']=="0")
                                    $arr1["ad_id"]=($detail->getLastInsertID());
								 $arr1["am_id"]=$masterid;
	
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
		App::import('Model','acaradetail2');
		$detail=new AcaraDetail2();
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
				$detail->primaryKey='ad_id';
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
		App::import('Model','acaradetaillist');
		$detaillist=new AcaraDetailList;
		$mid=0;
		if(isset($_POST['am_id']))
			$mid = $_POST['am_id'];
		$dataall=$detaillist->find('all',array('conditions'=>array('am_id'=>$mid)));
		$count=$detaillist->find('count',array('conditions'=>array('am_id'=>$mid)));
		 $results = Set::extract($dataall,'{n}.AcaraDetailList');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	function createdetail_1(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		$this->layout='ajax';
			App::import('Model','acaradetail');
		$detail=new AcaraDetail;
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
					    $data1['AcaraDetail'][$k]=$v;
                        $arr1[$k]=$v;
						 
                       
					}
                    $data1['AcaraDetail']['am_id']=$masterid;
                    $data1['AcaraDetail']['src_code']=null;
                   
				 	$detail->primaryKey="ad_id";
					try {
						if ($detail->save($data1)){
							    if ($data1['AcaraDetail']['ad_id']=="0")
								    $arr1["ad_id"]=($detail->getLastInsertID());
								$arr1["am_id"]=$masterid;
							 

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
					   $data1['AcaraDetail'][$k]=$v;
                        $arr1[$k]=$v;
                       
					}
                    $data1['AcaraDetail']['src_code']=null;
                    $data1['AcaraDetail']['am_id']=$masterid;
				  
					$detail->primaryKey="ad_id";
					try{
						if ($detail->save($data1)){
						        if ($data1['AcaraDetail']['ad_id']=="0")
                                    $arr1["ad_id"]=($detail->getLastInsertID());  
								 
								 $arr1["am_id"]=$masterid;
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
		App::import('Model','acaradetail');
		$detail=new AcaraDetail;
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
                        $data1['AcaraDetail'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['AcaraDetail']['am_id']=$masterid;
                    $data1['AcaraDetail']['src_code']=null;
                   
                    $detail->primaryKey="ad_id";
                    try {
                        if ($detail->save($data1)){
                            if ($data1['AcaraDetail']['ad_id']=="0")
                                    $arr1["ad_id"]=($detail->getLastInsertID());
                            $arr1["am_id"]=$masterid;
							 
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
                        $data1['Acaradetail'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['AcaraDetail']['am_id']=$masterid;
                    $data1['AcaraDetail']['src_code']=null;
                   
                    $detail->primaryKey="ad_id";
                    try {
                        if ($detail->save($data1)){
								  if ($data1['AcaraDetail']['ad_id']=="0")
                                    $arr1["ad_id"]=($detail->getLastInsertID());
								 $arr1["am_id"]=$masterid;
	
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
		App::import('Model','acaradetail');
		$detail=new AcaraDetail();
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
				$detail->primaryKey='ad_id';
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