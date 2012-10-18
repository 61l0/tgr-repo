<?php
class BelanjaController extends AppController
{
    var $name = 'belanja';
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
		App::import('Model','belanjamasterlist');
		$master=new BelanjaMasterList();
		 
		if ($key!=""){
			$key=strtolower($key);
		
			$whereis=array('conditions'=> 
											array('AND'=>array(array('lower(BelanjaMasterList.bm_no)' =>"$key"))),
										'order'=>'BelanjaMasterList.bm_no','limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>array(array('lower(BelanjaMasterList.bm_no) '=>"$key") )) );
			$dataAll=$master->find('all',$whereis);
			$count=$master->find('count',$wherecount);
		}
		else {
			$dataAll=$master->find('all' ,array('conditions'=>array('BelanjaMasterList.bm_no'=>"$key"),'limit'=>$limit,'page'=>$page));
			$count=$master->find('count',array('conditions'=>array('BelanjaMasterList.bm_no'=>"$key")));
		}
		$dataAll = Set::extract($dataAll,'{n}.BelanjaMasterList');
		$this->set('dataAll','{"total":'.$count.',"belanjamasters":'.json_encode($dataAll).'}');
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
		App::import('Model','belanjamasterlist');
		$master=new BelanjaMasterList();
		$un_id="";
		if(isset($_POST['un_id']))
			$un_id= $_POST['un_id']; 
		if ($key!=""){
			$key=strtolower($key);
		
			$whereis=array('conditions'=> array('AND'=>array(array('lower(BelanjaMasterList.bm_no) LIKE '=>"%$key%") )),
											array('AND'=>array(array('BelanjaMasterList.un_id' =>$un_id))),
										'order'=>'BelanjaMasterList.bm_no','limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>array(array('lower(BelanjaMasterList.bm_no) LIKE '=>"%$key%") )),
												array('AND'=>array(array('BelanjaMasterList.un_id' =>$un_id))));
			$dataAll=$master->find('all',$whereis);
			$count=$master->find('count',$wherecount);
		}
		else {
			$dataAll=$master->find('all' ,array('conditions'=>array('BelanjaMasterList.un_id'=>$un_id),'limit'=>$limit,'page'=>$page));
			$count=$master->find('count',array('conditions'=>array('BelanjaMasterList.un_id'=>$un_id)));
		}
		$dataAll = Set::extract($dataAll,'{n}.BelanjaMasterList');
		$this->set('dataAll','{"total":'.$count.',"belanjamasters":'.json_encode($dataAll).'}');
	}  
	function adddetail0(){
		Configure::write('debug',2);
		set_error_handler(array($this, 'handleError'));
		$this->layout = 'ajax';
			if ($this->data['BelanjaDetail0']['dpbm_no']!=''){
				$this->data['BelanjaDetail0']['bd_nilai']=r(',','',$this->data['BelanjaDetail0']['bd_nilai']); 
				$this->data['BelanjaDetail0']['bd_tersedia']=r(',','',$this->data['BelanjaDetail0']['bd_tersedia']); 
				$this->data['BelanjaDetail0']['bd_sisa']=r(',','',$this->data['BelanjaDetail0']['bd_sisa']); 
				$this->data['BelanjaDetail0']['bd_angg']=r(',','',$this->data['BelanjaDetail0']['bd_angg']); 
				App::import('Model','belanjadetail0');
				$detail0=new BelanjaDetail0;
				$check0=$detail0->findByBelanjam_id($this->data['BelanjaDetail0']['bm_id']);
				if(!empty($check0)){
					$detail0->bd_id=$check0['BelanjaDetail0']['bd_id'];
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
		 
		App::import('Model','belanjadetail0');
		$detail=new BelanjaDetail0();
		 
		$dataAll=$detail->find('all' ,array('conditions'=>array('bm_id'=>$master_id),'order'=>'bd_id','limit'=>1));
		$count=$detail->find('count',array('conditions'=>array('bm_id'=>$master_id)));
		 
		$dataAll = Set::extract($dataAll,'{n}.BelanjaDetail0');
		$this->set('dataAll','{"total":'.$count.',"belanjadetails":'.json_encode($dataAll).'}');
	}  
	 function add(){
		Configure::write('debug',2);
		set_error_handler(array($this, 'handleError'));
		$this->layout = 'ajax';
		App::import('Model','belanjamaster');
		$belanjamaster=new BelanjaMaster;
	 
		if (!empty($this->data)) {
			    $admin=$this->Session->read('PB_USER_SESSION');
			
			   
				$checkdata=$belanjamaster->findByBm_id($this->data['BelanjaMaster']['bm_id']);
				 if (empty($checkdata)) {
				 
					$belanjamaster->create();
				 }
				 else {
				 	$belanjamaster->bm_id=$this->data['BelanjaMaster']['bm_id'];
				 }
				 
					try {
						if ($belanjamaster->save($this->data)) {
						//	$newid=$salesmaster->getLastInsertID();
						if (isset($belanjamaster->bm_id)) $newid=$belanjamaster->bm_id;
						else $newid=$belanjamaster->getLastInsertID();
							//
							#checkdetail0
							
							$newno=$this->data['BelanjaMaster']['bm_no'];
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
		App::import('Model','belanjamasterlist');
		$belanjamasterlist=new BelanjaMasterList;
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
			'order'=> 'BelanjaMasterList.bm_tgl asc' ,'limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>
				array('OR'=>array(
						array('lower(bm_no)  LIKE' => "%$search%"),
					array('lower(un_kode) LIKE' =>"%$search%"),
					array('lower(un_nama) LIKE' =>"%$search%") )) 
			));
		}
		else {
	  		$whereis=array(  'order'=>'BelanjaMasterList.bm_tgl asc','limit'=>$limit,'page'=>$page);
			$wherecount=array();
		}
		$dataAll=$belanjamasterlist->find('all',$whereis);
		$count=$belanjamasterlist->find('count',$wherecount);
 		 $this->set('dataAll','{"total":'.$count.',"belanjamasters":'.json_encode($dataAll).'}');

	}
	 
  	function readdetail_2($form_no=0){
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','belanjadetail2list');
		$detaillist=new BelanjaDetail2List;
		$mid=0;
		if(isset($_POST['bm_id']))
			$mid = $_POST['bm_id'];
		$dataall=$detaillist->find('all',array('conditions'=>array('bm_id'=>$mid),'order'=>'akun_kode'));
		$count=$detaillist->find('count',array('conditions'=>array('bm_id'=>$mid)));
		 $results = Set::extract($dataall,'{n}.BelanjaDetail2List');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	function createdetail_2(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		$this->layout='ajax';
			App::import('Model','belanjadetail2');
		$detail=new BelanjaDetail2;
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
					    $data1['BelanjaDetail2'][$k]=$v;
                        $arr1[$k]=$v;
						 
                       
					}
                    $data1['BelanjaDetail2']['bm_id']=$masterid;
                    $data1['BelanjaDetail2']['src_code']=null;
                   
				 	$detail->primaryKey="bd_id";
					try {
						if ($detail->save($data1)){
							    if ($data1['BelanjaDetail2']['bd_id']=="0")
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
					   $data1['BelanjaDetail2'][$k]=$v;
                        $arr1[$k]=$v;
                       
					}
                    $data1['BelanjaDetail2']['src_code']=null;
                    $data1['BelanjaDetail2']['bm_id']=$masterid;
				  
					$detail->primaryKey="bd_id";
					try{
						if ($detail->save($data1)){
						        if ($data1['BelanjaDetail2']['bd_id']=="0")
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
		App::import('Model','belanjadetail2');
		$detail=new BelanjaDetail2;
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
                        $data1['BelanjaDetail2'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['BelanjaDetail2']['bm_id']=$masterid;
                    $data1['BelanjaDetail2']['src_code']=null;
                   
                    $detail->primaryKey="bd_id";
                    try {
                        if ($detail->save($data1)){
                            if ($data1['BelanjaDetail2']['bd_id']=="0")
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
                        $data1['BelanjaDetail2'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['BelanjaDetail2']['bm_id']=$masterid;
                    $data1['BelanjaDetail2']['src_code']=null;
                   
                    $detail->primaryKey="bd_id";
                    try {
                        if ($detail->save($data1)){
								  if ($data1['BelanjaDetail2']['bd_id']=="0")
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
		App::import('Model','belanjadetail2');
		$detail=new BelanjaDetail2();
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
///----- REKENING

	function readdetail_0($form_no=0){
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','belanjadetaillist');
		$detaillist=new BelanjaDetailList;
		$mid=0;
		if(isset($_POST['bm_id']))
			$mid = $_POST['bm_id'];
		$dataall=$detaillist->find('all',array('conditions'=>array('bm_id'=>$mid)));
		$count=$detaillist->find('count',array('conditions'=>array('bm_id'=>$mid)));
		 $results = Set::extract($dataall,'{n}.BelanjaDetailList');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	function createdetail_0(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		$this->layout='ajax';
			App::import('Model','belanjadetail');
		$detail=new BelanjaDetail;
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
					    $data1['BelanjaDetail'][$k]=$v;
                        $arr1[$k]=$v;
						 
                       
					}
                    $data1['BelanjaDetail']['bm_id']=$masterid;
                    $data1['BelanjaDetail']['src_code']=null;
                   
				 	$detail->primaryKey="bd_id";
					try {
						if ($detail->save($data1)){
							    if ($data1['BelanjaDetail']['bd_id']=="0")
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
					   $data1['BelanjaDetail'][$k]=$v;
                        $arr1[$k]=$v;
                       
					}
                    $data1['BelanjaDetail']['src_code']=null;
                    $data1['BelanjaDetail']['bm_id']=$masterid;
				  
					$detail->primaryKey="bd_id";
					try{
						if ($detail->save($data1)){
						        if ($data1['BelanjaDetail']['bd_id']=="0")
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
function updatedetail_0(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		App::import('Model','belanjadetail');
		$detail=new BelanjaDetail;
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
                        $data1['BelanjaDetail'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['BelanjaDetail']['bm_id']=$masterid;
                    $data1['BelanjaDetail']['src_code']=null;
                   
                    $detail->primaryKey="bd_id";
                    try {
                        if ($detail->save($data1)){
                            if ($data1['BelanjaDetail']['bd_id']=="0")
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
                        $data1['Belanjadetail'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['BelanjaDetail']['bm_id']=$masterid;
                    $data1['BelanjaDetail']['src_code']=null;
                   
                    $detail->primaryKey="bd_id";
                    try {
                        if ($detail->save($data1)){
								  if ($data1['BelanjaDetail']['bd_id']=="0")
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
	function destroydetail_0(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','belanjadetail');
		$detail=new BelanjaDetail();
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



	function readdetail_1($form_no=0){
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','belanjadetail1list');
		$detaillist=new BelanjaDetail11List;
		$mid=0;
		if(isset($_POST['bm_id']))
			$mid = $_POST['bm_id'];
		$dataall=$detaillist->find('all',array('conditions'=>array('bm_id'=>$mid)));
		$count=$detaillist->find('count',array('conditions'=>array('bm_id'=>$mid)));
		 $results = Set::extract($dataall,'{n}.BelanjaDetail1List');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	function createdetail_1(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		$this->layout='ajax';
			App::import('Model','belanjadetail1');
		$detail=new BelanjaDetail1;
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
					    $data1['BelanjaDetail1'][$k]=$v;
                        $arr1[$k]=$v;
						 
                       
					}
                    $data1['BelanjaDetail1']['bm_id']=$masterid;
                    $data1['BelanjaDetail1']['src_code']=null;
                   
				 	$detail->primaryKey="bd_id";
					try {
						if ($detail->save($data1)){
							    if ($data1['BelanjaDetail1']['bd_id']=="0")
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
					   $data1['BelanjaDetail1'][$k]=$v;
                        $arr1[$k]=$v;
                       
					}
                    $data1['BelanjaDetail1']['src_code']=null;
                    $data1['BelanjaDetail1']['bm_id']=$masterid;
				  
					$detail->primaryKey="bd_id";
					try{
						if ($detail->save($data1)){
						        if ($data1['BelanjaDetail1']['bd_id']=="0")
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
		App::import('Model','belanjadetail1');
		$detail=new BelanjaDetail1;
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
                        $data1['BelanjaDetail1'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['BelanjaDetail1']['bm_id']=$masterid;
                    $data1['BelanjaDetail1']['src_code']=null;
                   
                    $detail->primaryKey="bd_id";
                    try {
                        if ($detail->save($data1)){
                            if ($data1['BelanjaDetail1']['bd_id']=="0")
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
                        $data1['Belanjadetail'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['BelanjaDetail1']['bm_id']=$masterid;
                    $data1['BelanjaDetail1']['src_code']=null;
                   
                    $detail->primaryKey="bd_id";
                    try {
                        if ($detail->save($data1)){
								  if ($data1['BelanjaDetail1']['bd_id']=="0")
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
		App::import('Model','belanjadetail1');
		$detail=new BelanjaDetail1();
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