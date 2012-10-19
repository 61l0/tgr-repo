<?php
class KembaliController extends AppController
{
    var $name = 'kembali';
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
		App::import('Model','kembalimasterlist');
		$master=new KembaliMasterList();
		 
		if ($key!=""){
			$key=strtolower($key);
		
			$whereis=array('conditions'=> 
											array('AND'=>array(array('lower(KembaliMasterList.km_no)' =>"$key"))),
										'order'=>'KembaliMasterList.km_no','limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>array(array('lower(KembaliMasterList.km_no) '=>"$key") )) );
			$dataAll=$master->find('all',$whereis);
			$count=$master->find('count',$wherecount);
		}
		else {
			$dataAll=$master->find('all' ,array('conditions'=>array('KembaliMasterList.km_no'=>"$key"),'limit'=>$limit,'page'=>$page));
			$count=$master->find('count',array('conditions'=>array('KembaliMasterList.km_no'=>"$key")));
		}
		$dataAll = Set::extract($dataAll,'{n}.KembaliMasterList');
		$this->set('dataAll','{"total":'.$count.',"kembalimasters":'.json_encode($dataAll).'}');
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
		App::import('Model','kembalimasterlist');
		$master=new KembaliMasterList();
		$un_id="";
		if(isset($_POST['un_id']))
			$un_id= $_POST['un_id']; 
		if ($key!=""){
			$key=strtolower($key);
		
			$whereis=array('conditions'=> array('AND'=>array(array('lower(KembaliMasterList.km_no) LIKE '=>"%$key%") )),
											array('AND'=>array(array('KembaliMasterList.un_id' =>$un_id))),
										'order'=>'KembaliMasterList.km_no','limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>array(array('lower(KembaliMasterList.km_no) LIKE '=>"%$key%") )),
												array('AND'=>array(array('KembaliMasterList.un_id' =>$un_id))));
			$dataAll=$master->find('all',$whereis);
			$count=$master->find('count',$wherecount);
		}
		else {
			$dataAll=$master->find('all' ,array('conditions'=>array('KembaliMasterList.un_id'=>$un_id),'limit'=>$limit,'page'=>$page));
			$count=$master->find('count',array('conditions'=>array('KembaliMasterList.un_id'=>$un_id)));
		}
		$dataAll = Set::extract($dataAll,'{n}.KembaliMasterList');
		$this->set('dataAll','{"total":'.$count.',"kembalimasters":'.json_encode($dataAll).'}');
	}  
	function adddetail0(){
		Configure::write('debug',2);
		set_error_handler(array($this, 'handleError'));
		$this->layout = 'ajax';
			if ($this->data['KembaliDetail0']['dpkm_no']!=''){
				$this->data['KembaliDetail0']['kd_nilai']=r(',','',$this->data['KembaliDetail0']['kd_nilai']); 
				$this->data['KembaliDetail0']['kd_tersedia']=r(',','',$this->data['KembaliDetail0']['kd_tersedia']); 
				$this->data['KembaliDetail0']['kd_sisa']=r(',','',$this->data['KembaliDetail0']['kd_sisa']); 
				$this->data['KembaliDetail0']['kd_angg']=r(',','',$this->data['KembaliDetail0']['kd_angg']); 
				App::import('Model','kembalidetail0');
				$detail0=new KembaliDetail0;
				$check0=$detail0->findByKembalim_id($this->data['KembaliDetail0']['km_id']);
				if(!empty($check0)){
					$detail0->kd_id=$check0['KembaliDetail0']['kd_id'];
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
		if(isset($_REQUEST['km_id']))
			$master_id = $_REQUEST['km_id'];
		else $master_id="";
		 
		App::import('Model','kembalidetail0');
		$detail=new KembaliDetail0();
		 
		$dataAll=$detail->find('all' ,array('conditions'=>array('km_id'=>$master_id),'order'=>'kd_id','limit'=>1));
		$count=$detail->find('count',array('conditions'=>array('km_id'=>$master_id)));
		 
		$dataAll = Set::extract($dataAll,'{n}.KembaliDetail0');
		$this->set('dataAll','{"total":'.$count.',"kembalidetails":'.json_encode($dataAll).'}');
	}  
	 function add(){
		Configure::write('debug',2);
		set_error_handler(array($this, 'handleError'));
		$this->layout = 'ajax';
		App::import('Model','kembalimaster');
		$kembalimaster=new KembaliMaster;
	 
		if (!empty($this->data)) {
			    $admin=$this->Session->read('PB_USER_SESSION');
			
			   
				$checkdata=$kembalimaster->findByKm_id($this->data['KembaliMaster']['km_id']);
				 if (empty($checkdata)) {
				 
					$kembalimaster->create();
				 }
				 else {
				 	$kembalimaster->km_id=$this->data['KembaliMaster']['km_id'];
				 }
				 
					try {
						if ($kembalimaster->save($this->data)) {
						//	$newid=$salesmaster->getLastInsertID();
						if (isset($kembalimaster->km_id)) $newid=$kembalimaster->km_id;
						else $newid=$kembalimaster->getLastInsertID();
							//
							#checkdetail0
							
							$newno=$this->data['KembaliMaster']['km_no'];
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
		App::import('Model','kembalimasterlist');
		$kembalimasterlist=new KembaliMasterList;
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
					array('lower(km_no)  LIKE' => "%$search%"),
					array('lower(un_kode) LIKE' =>"%$search%"),
					array('lower(un_nama) LIKE' =>"%$search%") 
				 )) 
			),
			'order'=> 'KembaliMasterList.km_tgl asc' ,'limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>
				array('OR'=>array(
						array('lower(km_no)  LIKE' => "%$search%"),
					array('lower(un_kode) LIKE' =>"%$search%"),
					array('lower(un_nama) LIKE' =>"%$search%") )) 
			));
		}
		else {
	  		$whereis=array(  'order'=>'KembaliMasterList.km_tgl asc','limit'=>$limit,'page'=>$page);
			$wherecount=array();
		}
		$dataAll=$kembalimasterlist->find('all',$whereis);
		$count=$kembalimasterlist->find('count',$wherecount);
 		 $this->set('dataAll','{"total":'.$count.',"kembalimasters":'.json_encode($dataAll).'}');

	}
	 
  	function readdetail_2($form_no=0){
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','kembalidetail2list');
		$detaillist=new KembaliDetail2List;
		$mid=0;
		if(isset($_POST['km_id']))
			$mid = $_POST['km_id'];
		$dataall=$detaillist->find('all',array('conditions'=>array('km_id'=>$mid),'order'=>'akun_kode'));
		$count=$detaillist->find('count',array('conditions'=>array('km_id'=>$mid)));
		 $results = Set::extract($dataall,'{n}.KembaliDetail2List');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	function createdetail_2(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		$this->layout='ajax';
			App::import('Model','kembalidetail2');
		$detail=new KembaliDetail2;
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
					    $data1['KembaliDetail2'][$k]=$v;
                        $arr1[$k]=$v;
						 
                       
					}
                    $data1['KembaliDetail2']['km_id']=$masterid;
                    $data1['KembaliDetail2']['src_code']=null;
                   
				 	$detail->primaryKey="kd_id";
					try {
						if ($detail->save($data1)){
							    if ($data1['KembaliDetail2']['kd_id']=="0")
								    $arr1["kd_id"]=($detail->getLastInsertID());
								$arr1["km_id"]=$masterid;
							 

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
					   $data1['KembaliDetail2'][$k]=$v;
                        $arr1[$k]=$v;
                       
					}
                    $data1['KembaliDetail2']['src_code']=null;
                    $data1['KembaliDetail2']['km_id']=$masterid;
				  
					$detail->primaryKey="kd_id";
					try{
						if ($detail->save($data1)){
						        if ($data1['KembaliDetail2']['kd_id']=="0")
                                    $arr1["kd_id"]=($detail->getLastInsertID());  
								 
								 $arr1["km_id"]=$masterid;
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
		App::import('Model','kembalidetail2');
		$detail=new KembaliDetail2;
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
                        $data1['KembaliDetail2'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['KembaliDetail2']['km_id']=$masterid;
                    $data1['KembaliDetail2']['src_code']=null;
                   
                    $detail->primaryKey="kd_id";
                    try {
                        if ($detail->save($data1)){
                            if ($data1['KembaliDetail2']['kd_id']=="0")
                                    $arr1["kd_id"]=($detail->getLastInsertID());
                            $arr1["km_id"]=$masterid;
							 
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
                        $data1['KembaliDetail2'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['KembaliDetail2']['km_id']=$masterid;
                    $data1['KembaliDetail2']['src_code']=null;
                   
                    $detail->primaryKey="kd_id";
                    try {
                        if ($detail->save($data1)){
								  if ($data1['KembaliDetail2']['kd_id']=="0")
                                    $arr1["kd_id"]=($detail->getLastInsertID());
								 $arr1["km_id"]=$masterid;
	
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
		App::import('Model','kembalidetail2');
		$detail=new KembaliDetail2();
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
				$detail->primaryKey='kd_id';
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
		App::import('Model','kembalidetaillist');
		$detaillist=new KembaliDetailList;
		$mid=0;
		if(isset($_POST['km_id']))
			$mid = $_POST['km_id'];
		$dataall=$detaillist->find('all',array('conditions'=>array('km_id'=>$mid)));
		$count=$detaillist->find('count',array('conditions'=>array('km_id'=>$mid)));
		 $results = Set::extract($dataall,'{n}.KembaliDetailList');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	function createdetail_1(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		$this->layout='ajax';
			App::import('Model','kembalidetail');
		$detail=new KembaliDetail;
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
					    $data1['KembaliDetail'][$k]=$v;
                        $arr1[$k]=$v;
						 
                       
					}
                    $data1['KembaliDetail']['km_id']=$masterid;
                    $data1['KembaliDetail']['src_code']=null;
                   
				 	$detail->primaryKey="kd_id";
					try {
						if ($detail->save($data1)){
							    if ($data1['KembaliDetail']['kd_id']=="0")
								    $arr1["kd_id"]=($detail->getLastInsertID());
								$arr1["km_id"]=$masterid;
							 

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
					   $data1['KembaliDetail'][$k]=$v;
                        $arr1[$k]=$v;
                       
					}
                    $data1['KembaliDetail']['src_code']=null;
                    $data1['KembaliDetail']['km_id']=$masterid;
				  
					$detail->primaryKey="kd_id";
					try{
						if ($detail->save($data1)){
						        if ($data1['KembaliDetail']['kd_id']=="0")
                                    $arr1["kd_id"]=($detail->getLastInsertID());  
								 
								 $arr1["km_id"]=$masterid;
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
		App::import('Model','kembalidetail');
		$detail=new KembaliDetail;
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
                        $data1['KembaliDetail'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['KembaliDetail']['km_id']=$masterid;
                    $data1['KembaliDetail']['src_code']=null;
                   
                    $detail->primaryKey="kd_id";
                    try {
                        if ($detail->save($data1)){
                            if ($data1['KembaliDetail']['kd_id']=="0")
                                    $arr1["kd_id"]=($detail->getLastInsertID());
                            $arr1["km_id"]=$masterid;
							 
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
                        $data1['Kembalidetail'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['KembaliDetail']['km_id']=$masterid;
                    $data1['KembaliDetail']['src_code']=null;
                   
                    $detail->primaryKey="kd_id";
                    try {
                        if ($detail->save($data1)){
								  if ($data1['KembaliDetail']['kd_id']=="0")
                                    $arr1["kd_id"]=($detail->getLastInsertID());
								 $arr1["km_id"]=$masterid;
	
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
		App::import('Model','kembalidetail');
		$detail=new KembaliDetail();
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
				$detail->primaryKey='kd_id';
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