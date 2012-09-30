<?php
class Sp2dController extends AppController
{
    var $name = 'sp2d';
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
		App::import('Model','sp2dmasterlist');
		$master=new Sp2dMasterList();
		 
		if ($key!=""){
			$key=strtolower($key);
		
			$whereis=array('conditions'=> 
											array('AND'=>array(array('lower(Sp2dMasterList.sp2dm_no)' =>"$key"))),
										'order'=>'Sp2dMasterList.sp2dm_no','limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>array(array('lower(Sp2dMasterList.sp2dm_no) '=>"$key") )) );
			$dataAll=$master->find('all',$whereis);
			$count=$master->find('count',$wherecount);
		}
		else {
			$dataAll=$master->find('all' ,array('conditions'=>array('Sp2dMasterList.sp2dm_no'=>"$key"),'limit'=>$limit,'page'=>$page));
			$count=$master->find('count',array('conditions'=>array('Sp2dMasterList.sp2dm_no'=>"$key")));
		}
		$dataAll = Set::extract($dataAll,'{n}.Sp2dMasterList');
		$this->set('dataAll','{"total":'.$count.',"sp2dmasters":'.json_encode($dataAll).'}');
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
		App::import('Model','sp2dmasterlist');
		$master=new Sp2dMasterList();
		$un_id="";
		if(isset($_POST['un_id']))
			$un_id= $_POST['un_id']; 
		if ($key!=""){
			$key=strtolower($key);
		
			$whereis=array('conditions'=> array('AND'=>array(array('lower(Sp2dMasterList.sp2dm_no) LIKE '=>"%$key%") )),
											array('AND'=>array(array('Sp2dMasterList.un_id' =>$un_id))),
										'order'=>'Sp2dMasterList.sp2dm_no','limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>array(array('lower(Sp2dMasterList.sp2dm_no) LIKE '=>"%$key%") )),
												array('AND'=>array(array('Sp2dMasterList.un_id' =>$un_id))));
			$dataAll=$master->find('all',$whereis);
			$count=$master->find('count',$wherecount);
		}
		else {
			$dataAll=$master->find('all' ,array('conditions'=>array('Sp2dMasterList.un_id'=>$un_id),'limit'=>$limit,'page'=>$page));
			$count=$master->find('count',array('conditions'=>array('Sp2dMasterList.un_id'=>$un_id)));
		}
		$dataAll = Set::extract($dataAll,'{n}.Sp2dMasterList');
		$this->set('dataAll','{"total":'.$count.',"sp2dmasters":'.json_encode($dataAll).'}');
	}  
	function adddetail3(){
		Configure::write('debug',2);
		set_error_handler(array($this, 'handleError'));
		$this->layout = 'ajax';
			if ($this->data['Sp2dDetail0']['dpam_no']!=''){
				$this->data['Sp2dDetail0']['sp2dd_nilai']=r(',','',$this->data['Sp2dDetail0']['sp2dd_nilai']); 
				$this->data['Sp2dDetail0']['sp2dd_tersedia']=r(',','',$this->data['Sp2dDetail0']['sp2dd_tersedia']); 
				$this->data['Sp2dDetail0']['sp2dd_sisa']=r(',','',$this->data['Sp2dDetail0']['sp2dd_sisa']); 
				$this->data['Sp2dDetail0']['sp2dd_angg']=r(',','',$this->data['Sp2dDetail0']['sp2dd_angg']); 
				App::import('Model','sp2ddetail3');
				$detail3=new Sp2dDetail0;
				$check0=$detail3->findBySpdm_id($this->data['Sp2dDetail0']['sp2dm_id']);
				if(!empty($check0)){
					$detail3->sp2dd_id=$check0['Sp2dDetail0']['sp2dd_id'];
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
		if(isset($_REQUEST['sp2dm_id']))
			$master_id = $_REQUEST['sp2dm_id'];
		else $master_id="";
		 
		App::import('Model','sp2ddetail3');
		$detail=new Sp2dDetail0();
		 
		$dataAll=$detail->find('all' ,array('conditions'=>array('sp2dm_id'=>$master_id),'order'=>'sp2dd_id','limit'=>1));
		$count=$detail->find('count',array('conditions'=>array('sp2dm_id'=>$master_id)));
		 
		$dataAll = Set::extract($dataAll,'{n}.Sp2dDetail3');
		$this->set('dataAll','{"total":'.$count.',"sp2ddetail3s":'.json_encode($dataAll).'}');
	}  
	 function add(){
		Configure::write('debug',2);
		set_error_handler(array($this, 'handleError'));
		$this->layout = 'ajax';
		App::import('Model','sp2dmaster');
		$sp2dmaster=new Sp2dMaster;
	 
		if (!empty($this->data)) {
			    $admin=$this->Session->read('PB_USER_SESSION');

			 
				$checkdata=$sp2dmaster->findBySp2dm_id($this->data['Sp2dMaster']['sp2dm_id']);
				 if (empty($checkdata)) {
				 
					$sp2dmaster->create();
				 }
				 else {
				 	$sp2dmaster->sp2dm_id=$this->data['Sp2dMaster']['sp2dm_id'];
				 }
				 $this->data['Sp2dMaster']['sp2dm_total']=r(',','',$this->data['Sp2dMaster']['sp2dm_total']);
					try {
						if ($sp2dmaster->save($this->data)) {
						//	$newid=$salesmaster->getLastInsertID();
						if (isset($sp2dmaster->sp2dm_id)) $newid=$sp2dmaster->sp2dm_id;
						else $newid=$sp2dmaster->getLastInsertID();
							//
							#checkdetail3
							
							$newno=$this->data['Sp2dMaster']['sp2dm_no'];
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
		App::import('Model','sp2dmasterlist');
		$sp2dmasterlist=new Sp2dMasterList;
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
					array('lower(sp2dm_no)  LIKE' => "%$search%"),
					array('lower(un_kode) LIKE' =>"%$search%"),
					array('lower(un_nama) LIKE' =>"%$search%") 
				 )) 
			),
			'order'=> 'Sp2dMasterList.sp2dm_tgl asc' ,'limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>
				array('OR'=>array(
						array('lower(sp2dm_no)  LIKE' => "%$search%"),
					array('lower(un_kode) LIKE' =>"%$search%"),
					array('lower(un_nama) LIKE' =>"%$search%") )) 
			));
		}
		else {
	  		$whereis=array(  'order'=>'Sp2dMasterList.sp2dm_tgl asc','limit'=>$limit,'page'=>$page);
			$wherecount=array();
		}
		$dataAll=$sp2dmasterlist->find('all',$whereis);
		$count=$sp2dmasterlist->find('count',$wherecount);
 		 $this->set('dataAll','{"total":'.$count.',"sp2dmasters":'.json_encode($dataAll).'}');

	}
	 
  	function readdetail_2($form_no=0){
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','sp2ddetail2list');
		$detaillist=new Sp2dDetail2List;
		$mid=0;
		if(isset($_POST['sp2dm_id']))
			$mid = $_POST['sp2dm_id'];
		$dataall=$detaillist->find('all',array('conditions'=>array('sp2dm_id'=>$mid),'order'=>'pjk_kode'));
		$count=$detaillist->find('count',array('conditions'=>array('sp2dm_id'=>$mid)));
		 $results = Set::extract($dataall,'{n}.Sp2dDetail2List');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	function createdetail_2(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		$this->layout='ajax';
			App::import('Model','sp2ddetail2');
		$detail=new Sp2dDetail2;
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
					    $data1['Sp2dDetail2'][$k]=$v;
                        $arr1[$k]=$v;
						 
                       
					}
                    $data1['Sp2dDetail2']['sp2dm_id']=$masterid;
                    $data1['Sp2dDetail2']['src_code']=null;
                   
				 	$detail->primaryKey="sp2dd_id";
					try {
						if ($detail->save($data1)){
							    if ($data1['Sp2dDetail2']['sp2dd_id']=="0")
								    $arr1["sp2dd_id"]=($detail->getLastInsertID());
								$arr1["sp2dm_id"]=$masterid;
							 

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
					   $data1['Sp2dDetail2'][$k]=$v;
                        $arr1[$k]=$v;
                       
					}
                    $data1['Sp2dDetail2']['src_code']=null;
                    $data1['Sp2dDetail2']['sp2dm_id']=$masterid;
				  
					$detail->primaryKey="sp2dd_id";
					try{
						if ($detail->save($data1)){
						        if ($data1['Sp2dDetail2']['sp2dd_id']=="0")
                                    $arr1["sp2dd_id"]=($detail->getLastInsertID());  
								 
								 $arr1["sp2dm_id"]=$masterid;
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
		App::import('Model','sp2ddetail2');
		$detail=new Sp2dDetail2;
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
                        $data1['Sp2dDetail2'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['Sp2dDetail2']['sp2dm_id']=$masterid;
                    $data1['Sp2dDetail2']['src_code']=null;
                   
                    $detail->primaryKey="sp2dd_id";
                    try {
                        if ($detail->save($data1)){
                            if ($data1['Sp2dDetail2']['sp2dd_id']=="0")
                                    $arr1["sp2dd_id"]=($detail->getLastInsertID());
                            $arr1["sp2dm_id"]=$masterid;
							 
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
                        $data1['Sp2dDetail2'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['Sp2dDetail2']['sp2dm_id']=$masterid;
                    $data1['Sp2dDetail2']['src_code']=null;
                   
                    $detail->primaryKey="sp2dd_id";
                    try {
                        if ($detail->save($data1)){
								  if ($data1['Sp2dDetail2']['sp2dd_id']=="0")
                                    $arr1["sp2dd_id"]=($detail->getLastInsertID());
								 $arr1["sp2dm_id"]=$masterid;
	
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
		App::import('Model','sp2ddetail2');
		$detail=new Sp2dDetail2();
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
				$detail->primaryKey='sp2dd_id';
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
		App::import('Model','sp2ddetail1list');
		$detaillist=new Sp2dDetail1List;
		$mid=0;
		if(isset($_POST['sp2dm_id']))
			$mid = $_POST['sp2dm_id'];
		$dataall=$detaillist->find('all',array('conditions'=>array('sp2dm_id'=>$mid)));
		$count=$detaillist->find('count',array('conditions'=>array('sp2dm_id'=>$mid)));
		 $results = Set::extract($dataall,'{n}.Sp2dDetail1List');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	function createdetail_1(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		$this->layout='ajax';
			App::import('Model','sp2ddetail1');
		$detail=new Sp2dDetail1;
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
					    $data1['Sp2dDetail1'][$k]=$v;
                        $arr1[$k]=$v;
						 
                       
					}
                    $data1['Sp2dDetail1']['sp2dm_id']=$masterid;
                    $data1['Sp2dDetail1']['src_code']=null;
                   
				 	$detail->primaryKey="sp2dd_id";
					try {
						if ($detail->save($data1)){
							    if ($data1['Sp2dDetail1']['sp2dd_id']=="0")
								    $arr1["sp2dd_id"]=($detail->getLastInsertID());
								$arr1["sp2dm_id"]=$masterid;
							 

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
					   $data1['Sp2dDetail1'][$k]=$v;
                        $arr1[$k]=$v;
                       
					}
                    $data1['Sp2dDetail1']['src_code']=null;
                    $data1['Sp2dDetail1']['sp2dm_id']=$masterid;
				  
					$detail->primaryKey="sp2dd_id";
					try{
						if ($detail->save($data1)){
						        if ($data1['Sp2dDetail1']['sp2dd_id']=="0")
                                    $arr1["sp2dd_id"]=($detail->getLastInsertID());  
								 
								 $arr1["sp2dm_id"]=$masterid;
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
		App::import('Model','sp2ddetail1');
		$detail=new Sp2dDetail1;
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
                        $data1['Sp2dDetail1'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['Sp2dDetail1']['sp2dm_id']=$masterid;
                    $data1['Sp2dDetail1']['src_code']=null;
                   
                    $detail->primaryKey="sp2dd_id";
                    try {
                        if ($detail->save($data1)){
                            if ($data1['Sp2dDetail1']['sp2dd_id']=="0")
                                    $arr1["sp2dd_id"]=($detail->getLastInsertID());
                            $arr1["sp2dm_id"]=$masterid;
							 
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
                        $data1['Sp2ddetail1'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['Sp2dDetail1']['sp2dm_id']=$masterid;
                    $data1['Sp2dDetail1']['src_code']=null;
                   
                    $detail->primaryKey="sp2dd_id";
                    try {
                        if ($detail->save($data1)){
								  if ($data1['Sp2dDetail1']['sp2dd_id']=="0")
                                    $arr1["sp2dd_id"]=($detail->getLastInsertID());
								 $arr1["sp2dm_id"]=$masterid;
	
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
		App::import('Model','sp2ddetail1');
		$detail=new Sp2dDetail1();
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
				$detail->primaryKey='sp2dd_id';
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
		App::import('Model','sp2ddetail3list');
		$detaillist=new Sp2dDetail3List;
		$mid=0;
		if(isset($_POST['sp2dm_id']))
			$mid = $_POST['sp2dm_id'];
		$dataall=$detaillist->find('all',array('conditions'=>array('sp2dm_id'=>$mid),'order'=>'akun_kode'));
		$count=$detaillist->find('count',array('conditions'=>array('sp2dm_id'=>$mid)));
		 $results = Set::extract($dataall,'{n}.Sp2dDetail3List');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	function createdetail_3(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',3);
		$this->layout='ajax';
			App::import('Model','sp2ddetail3');
		$detail=new Sp2dDetail3;
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
					    $data1['Sp2dDetail3'][$k]=$v;
                        $arr1[$k]=$v;
						 
                       
					}
                    $data1['Sp2dDetail3']['sp2dm_id']=$masterid;
                    $data1['Sp2dDetail3']['src_code']=null;
                   
				 	$detail->primaryKey="sp2dd_id";
					try {
						if ($detail->save($data1)){
							    if ($data1['Sp2dDetail3']['sp2dd_id']=="0")
								    $arr1["sp2dd_id"]=($detail->getLastInsertID());
								$arr1["sp2dm_id"]=$masterid;
							 

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
					   $data1['Sp2dDetail3'][$k]=$v;
                        $arr1[$k]=$v;
                       
					}
                    $data1['Sp2dDetail3']['src_code']=null;
                    $data1['Sp2dDetail3']['sp2dm_id']=$masterid;
				  
					$detail->primaryKey="sp2dd_id";
					try{
						if ($detail->save($data1)){
						        if ($data1['Sp2dDetail3']['sp2dd_id']=="0")
                                    $arr1["sp2dd_id"]=($detail->getLastInsertID());  
								 
								 $arr1["sp2dm_id"]=$masterid;
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
		App::import('Model','sp2ddetail3');
		$detail=new Sp2dDetail3;
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
                        $data1['Sp2dDetail3'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['Sp2dDetail3']['sp2dm_id']=$masterid;
                    $data1['Sp2dDetail3']['src_code']=null;
                   
                    $detail->primaryKey="sp2dd_id";
                    try {
                        if ($detail->save($data1)){
                            if ($data1['Sp2dDetail3']['sp2dd_id']=="0")
                                    $arr1["sp2dd_id"]=($detail->getLastInsertID());
                            $arr1["sp2dm_id"]=$masterid;
							 
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
                        $data1['Sp2dDetail3'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['Sp2dDetail3']['sp2dm_id']=$masterid;
                    $data1['Sp2dDetail3']['src_code']=null;
                   
                    $detail->primaryKey="sp2dd_id";
                    try {
                        if ($detail->save($data1)){
								  if ($data1['Sp2dDetail3']['sp2dd_id']=="0")
                                    $arr1["sp2dd_id"]=($detail->getLastInsertID());
								 $arr1["sp2dm_id"]=$masterid;
	
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
		App::import('Model','sp2ddetail3');
		$detail=new Sp2dDetail3();
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
				$detail->primaryKey='sp2dd_id';
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