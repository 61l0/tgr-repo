<?php
class JeController extends AppController
{
    var $name = 'je';
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
		App::import('Model','jemasterlist');
		$master=new JeMasterList();
		 
		if ($key!=""){
			$key=strtolower($key);
		
			$whereis=array('conditions'=> 
											array('AND'=>array(array('lower(JeMasterList.jm_no)' =>"$key"))),
										'order'=>'JeMasterList.jm_no','limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>array(array('lower(JeMasterList.jm_no) '=>"$key") )) );
			$dataAll=$master->find('all',$whereis);
			$count=$master->find('count',$wherecount);
		}
		else {
			$dataAll=$master->find('all' ,array('conditions'=>array('JeMasterList.jm_no'=>"$key"),'limit'=>$limit,'page'=>$page));
			$count=$master->find('count',array('conditions'=>array('JeMasterList.jm_no'=>"$key")));
		}
		$dataAll = Set::extract($dataAll,'{n}.JeMasterList');
		$this->set('dataAll','{"total":'.$count.',"jemasters":'.json_encode($dataAll).'}');
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
		App::import('Model','jemasterlist');
		$master=new JeMasterList();
		$un_id="";
		if(isset($_POST['un_id']))
			$un_id= $_POST['un_id']; 
		if ($key!=""){
			$key=strtolower($key);
		
			$whereis=array('conditions'=> array('AND'=>array(array('lower(JeMasterList.jm_no) LIKE '=>"%$key%") )),
											array('AND'=>array(array('JeMasterList.un_id' =>$un_id))),
										'order'=>'JeMasterList.jm_no','limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>array(array('lower(JeMasterList.jm_no) LIKE '=>"%$key%") )),
												array('AND'=>array(array('JeMasterList.un_id' =>$un_id))));
			$dataAll=$master->find('all',$whereis);
			$count=$master->find('count',$wherecount);
		}
		else {
			$dataAll=$master->find('all' ,array('conditions'=>array('JeMasterList.un_id'=>$un_id),'limit'=>$limit,'page'=>$page));
			$count=$master->find('count',array('conditions'=>array('JeMasterList.un_id'=>$un_id)));
		}
		$dataAll = Set::extract($dataAll,'{n}.JeMasterList');
		$this->set('dataAll','{"total":'.$count.',"jemasters":'.json_encode($dataAll).'}');
	}  
	function adddetail0(){
		Configure::write('debug',2);
		set_error_handler(array($this, 'handleError'));
		$this->layout = 'ajax';
			if ($this->data['JeDetail0']['dpjm_no']!=''){
				$this->data['JeDetail0']['jd_nilai']=r(',','',$this->data['JeDetail0']['jd_nilai']); 
				$this->data['JeDetail0']['jd_tersedia']=r(',','',$this->data['JeDetail0']['jd_tersedia']); 
				$this->data['JeDetail0']['jd_sisa']=r(',','',$this->data['JeDetail0']['jd_sisa']); 
				$this->data['JeDetail0']['jd_angg']=r(',','',$this->data['JeDetail0']['jd_angg']); 
				App::import('Model','jedetail0');
				$detail0=new JeDetail0;
				$check0=$detail0->findByJem_id($this->data['JeDetail0']['jm_id']);
				if(!empty($check0)){
					$detail0->jd_id=$check0['JeDetail0']['jd_id'];
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
		if(isset($_REQUEST['jm_id']))
			$master_id = $_REQUEST['jm_id'];
		else $master_id="";
		 
		App::import('Model','jedetail0');
		$detail=new JeDetail0();
		 
		$dataAll=$detail->find('all' ,array('conditions'=>array('jm_id'=>$master_id),'order'=>'jd_id','limit'=>1));
		$count=$detail->find('count',array('conditions'=>array('jm_id'=>$master_id)));
		 
		$dataAll = Set::extract($dataAll,'{n}.JeDetail0');
		$this->set('dataAll','{"total":'.$count.',"jedetails":'.json_encode($dataAll).'}');
	}  
	 function add(){
		Configure::write('debug',2);
		set_error_handler(array($this, 'handleError'));
		$this->layout = 'ajax';
		App::import('Model','jemaster');
		$jemaster=new JeMaster;
	 
		if (!empty($this->data)) {
			    $admin=$this->Session->read('PB_USER_SESSION');
			
			   
				$checkdata=$jemaster->findByJm_id($this->data['JeMaster']['jm_id']);
				 if (empty($checkdata)) {
				 
					$jemaster->create();
				 }
				 else {
				 	$jemaster->jm_id=$this->data['JeMaster']['jm_id'];
				 }
				 
					try {
					 
						 	$this->data['JeMaster']['jm_totaldebit']=r(',','',$this->data['JeMaster']['jm_totaldebit']);
						 
							$this->data['JeMaster']['jm_totalcredit']=r(',','',$this->data['JeMaster']['jm_totalcredit']);
						if ($jemaster->save($this->data)) {
						//	$newid=$salesmaster->getLastInsertID();
						if (isset($jemaster->jm_id)) $newid=$jemaster->jm_id;
						else $newid=$jemaster->getLastInsertID();
							//
							#checkdetail0
							
							$newno=$this->data['JeMaster']['jm_no'];
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
	function getbalance(){
		
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','akunbal2list');
		$akunbal=new AkunBal2List;
		$limit=20;$start=0;
		$un_id='*';
		$akun_kode='';
		if(isset($_POST['limit']))
			$limit = $_POST['limit'];
	 	if(isset($_POST['start']))
			$start= $_POST['start'];
		if(isset($_POST['un_id']))
			$un_id=(trim($_POST['un_id']));
		if(isset($_POST['akun_kode']))
			$akun_kode=(trim($_POST['akun_kode']));
		$page = ($start/$limit)+1;
	 
			$whereis=array( 'conditions'=>array('AND'=>
			array('AND'=>array(
					array('akun_kode' => "$akun_kode"),
					array('un_id' =>"$un_id") 
				 )) 
			),
			'order'=> 'AkunBal2List.ab_seq asc' ,'limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>
				array('AND'=>array(
					array('akun_kode' => "$akun_kode"),
					array('un_id' =>"$un_id") 
				 )) 
			));
		 
		$dataAll=$akunbal->find('all',$whereis);
		$count=$akunbal->find('count',$wherecount);
		 $results = Set::extract($dataAll,'{n}.AkunBal2List');
 		 $this->set('dataAll','{"total":'.$count.',"data":'.json_encode($results).'}');

	}
	function getall(){
		
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','jemasterlist');
		$jemasterlist=new JeMasterList;
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
					array('lower(jm_no)  LIKE' => "%$search%"),
					array('lower(un_kode) LIKE' =>"%$search%"),
					array('lower(un_nama) LIKE' =>"%$search%") 
				 )) 
			),
			'order'=> 'JeMasterList.jm_tgl asc' ,'limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>
				array('OR'=>array(
						array('lower(jm_no)  LIKE' => "%$search%"),
					array('lower(un_kode) LIKE' =>"%$search%"),
					array('lower(un_nama) LIKE' =>"%$search%") )) 
			));
		}
		else {
	  		$whereis=array(  'order'=>'JeMasterList.jm_date asc','limit'=>$limit,'page'=>$page);
			$wherecount=array();
		}
		$dataAll=$jemasterlist->find('all',$whereis);
		$count=$jemasterlist->find('count',$wherecount);
			
 		 $this->set('dataAll','{"total":'.$count.',"jemasters":'.json_encode($dataAll).'}');

	}
	 
  	function readdetail_2($form_no=0){
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','jedetail2list');
		$detaillist=new JeDetail2List;
		$mid=0;
		if(isset($_POST['jm_id']))
			$mid = $_POST['jm_id'];
		$dataall=$detaillist->find('all',array('conditions'=>array('jm_id'=>$mid),'order'=>'akun_kode'));
		$count=$detaillist->find('count',array('conditions'=>array('jm_id'=>$mid)));
		 $results = Set::extract($dataall,'{n}.JeDetail2List');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	function createdetail_2(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		$this->layout='ajax';
			App::import('Model','jedetail2');
		$detail=new JeDetail2;
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
					    $data1['JeDetail2'][$k]=$v;
                        $arr1[$k]=$v;
						 
                       
					}
                    $data1['JeDetail2']['jm_id']=$masterid;
                    $data1['JeDetail2']['src_code']=null;
                   
				 	$detail->primaryKey="jd_id";
					try {
						if ($detail->save($data1)){
							    if ($data1['JeDetail2']['jd_id']=="0")
								    $arr1["jd_id"]=($detail->getLastInsertID());
								$arr1["jm_id"]=$masterid;
							 

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
					   $data1['JeDetail2'][$k]=$v;
                        $arr1[$k]=$v;
                       
					}
                    $data1['JeDetail2']['src_code']=null;
                    $data1['JeDetail2']['jm_id']=$masterid;
				  
					$detail->primaryKey="jd_id";
					try{
						if ($detail->save($data1)){
						        if ($data1['JeDetail2']['jd_id']=="0")
                                    $arr1["jd_id"]=($detail->getLastInsertID());  
								 
								 $arr1["jm_id"]=$masterid;
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
		App::import('Model','jedetail2');
		$detail=new JeDetail2;
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
                        $data1['JeDetail2'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['JeDetail2']['jm_id']=$masterid;
                    $data1['JeDetail2']['src_code']=null;
                   
                    $detail->primaryKey="jd_id";
                    try {
                        if ($detail->save($data1)){
                            if ($data1['JeDetail2']['jd_id']=="0")
                                    $arr1["jd_id"]=($detail->getLastInsertID());
                            $arr1["jm_id"]=$masterid;
							 
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
                        $data1['JeDetail2'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['JeDetail2']['jm_id']=$masterid;
                    $data1['JeDetail2']['src_code']=null;
                   
                    $detail->primaryKey="jd_id";
                    try {
                        if ($detail->save($data1)){
								  if ($data1['JeDetail2']['jd_id']=="0")
                                    $arr1["jd_id"]=($detail->getLastInsertID());
								 $arr1["jm_id"]=$masterid;
	
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
		App::import('Model','jedetail2');
		$detail=new JeDetail2();
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
				$detail->primaryKey='jd_id';
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
		App::import('Model','jedetaillist');
		$detaillist=new JeDetailList;
		$mid=0;
		if(isset($_POST['jm_id']))
			$mid = $_POST['jm_id'];
		$dataall=$detaillist->find('all',array('conditions'=>array('jm_id'=>$mid)));
		$count=$detaillist->find('count',array('conditions'=>array('jm_id'=>$mid)));
		 $results = Set::extract($dataall,'{n}.JeDetailList');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	function createdetail_1(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		$this->layout='ajax';
			App::import('Model','jedetail');
		$detail=new JeDetail;
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
					    $data1['JeDetail'][$k]=$v;
                        $arr1[$k]=$v;
						 
                       
					}
                    $data1['JeDetail']['jm_id']=$masterid;
                    $data1['JeDetail']['src_code']=null;
                   
				 	$detail->primaryKey="jd_id";
					try {
						if ($detail->save($data1)){
							    if ($data1['JeDetail']['jd_id']=="0")
								    $arr1["jd_id"]=($detail->getLastInsertID());
								$arr1["jm_id"]=$masterid;
							 

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
					   $data1['JeDetail'][$k]=$v;
                        $arr1[$k]=$v;
                       
					}
                    $data1['JeDetail']['src_code']=null;
                    $data1['JeDetail']['jm_id']=$masterid;
				  
					$detail->primaryKey="jd_id";
					try{
						if ($detail->save($data1)){
						        if ($data1['JeDetail']['jd_id']=="0")
                                    $arr1["jd_id"]=($detail->getLastInsertID());  
								 
								 $arr1["jm_id"]=$masterid;
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
		App::import('Model','jedetail');
		$detail=new JeDetail;
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
                        $data1['JeDetail'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['JeDetail']['jm_id']=$masterid;
                    $data1['JeDetail']['src_code']=null;
                   
                    $detail->primaryKey="jd_id";
                    try {
                        if ($detail->save($data1)){
                            if ($data1['JeDetail']['jd_id']=="0")
                                    $arr1["jd_id"]=($detail->getLastInsertID());
                            $arr1["jm_id"]=$masterid;
							 
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
                        $data1['Jedetail'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['JeDetail']['jm_id']=$masterid;
                    $data1['JeDetail']['src_code']=null;
                   
                    $detail->primaryKey="jd_id";
                    try {
                        if ($detail->save($data1)){
								  if ($data1['JeDetail']['jd_id']=="0")
                                    $arr1["jd_id"]=($detail->getLastInsertID());
								 $arr1["jm_id"]=$masterid;
	
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
		App::import('Model','jedetail');
		$detail=new JeDetail();
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
				$detail->primaryKey='jd_id';
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