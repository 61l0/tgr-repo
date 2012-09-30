<?php
class SppController extends AppController
{
    var $name = 'spp';
	var $uses=null;
	
	function index()
    {
		
     	
    }
	function getdetail2byno($form_no=0){
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','sppdetail2list');
		$detaillist=new SppDetail2List;
		$mid=0;
		if(isset($_POST['sppm_no']))
			$mid = $_POST['sppm_no'];
		$dataall=$detaillist->find('all',array('conditions'=>array('sppm_no'=>$mid),'order'=>'akun_kode'));
		$count=$detaillist->find('count',array('conditions'=>array('sppm_no'=>$mid)));
		 $results = Set::extract($dataall,'{n}.SppDetail2List');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
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
		App::import('Model','sppmasterlist');
		$master=new SppMasterList();
		 
		if ($key!=""){
			$key=strtolower($key);
		
			$whereis=array('conditions'=> 
											array('AND'=>array(array('lower(SppMasterList.sppm_no)' =>"$key"))),
										'order'=>'SppMasterList.sppm_no','limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>array(array('lower(SppMasterList.sppm_no) '=>"$key") )) );
			$dataAll=$master->find('all',$whereis);
			$count=$master->find('count',$wherecount);
		}
		else {
			$dataAll=$master->find('all' ,array('conditions'=>array('SppMasterList.sppm_no'=>"$key"),'limit'=>$limit,'page'=>$page));
			$count=$master->find('count',array('conditions'=>array('SppMasterList.sppm_no'=>"$key")));
		}
		$dataAll = Set::extract($dataAll,'{n}.SppMasterList');
		$this->set('dataAll','{"total":'.$count.',"sppmasters":'.json_encode($dataAll).'}');
	}  
	 function searchspp(){
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
		App::import('Model','sppmasterlist');
		$master=new SppMasterList();
		$un_id="";
		if(isset($_POST['un_id']))
			$un_id= $_POST['un_id']; 
		if ($key!=""){
			$key=strtolower($key);
		
			$whereis=array('conditions'=> array('AND'=>array(array('lower(SppMasterList.sppm_no) LIKE '=>"%$key%") )) ,
										'order'=>'SppMasterList.sppm_no','limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>array(array('lower(SppMasterList.sppm_no) LIKE '=>"%$key%") )) );
			$dataAll=$master->find('all',$whereis);
			$count=$master->find('count',$wherecount);
		}
		else {
			$dataAll=$master->find('all' ,array( 'limit'=>$limit,'page'=>$page));
			$count=$master->find('count');
		}
		$dataAll = Set::extract($dataAll,'{n}.SppMasterList');
		$this->set('dataAll','{"total":'.$count.',"sppmasters":'.json_encode($dataAll).'}');
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
		App::import('Model','sppmasterlist');
		$master=new SppMasterList();
		$un_id="";
		if(isset($_POST['un_id']))
			$un_id= $_POST['un_id']; 
		if ($key!=""){
			$key=strtolower($key);
		
			$whereis=array('conditions'=> array('AND'=>array(array('lower(SppMasterList.sppm_no) LIKE '=>"%$key%") )),
											array('AND'=>array(array('SppMasterList.un_id' =>$un_id))),
										'order'=>'SppMasterList.sppm_no','limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>array(array('lower(SppMasterList.sppm_no) LIKE '=>"%$key%") )),
												array('AND'=>array(array('SppMasterList.un_id' =>$un_id))));
			$dataAll=$master->find('all',$whereis);
			$count=$master->find('count',$wherecount);
		}
		else {
			$dataAll=$master->find('all' ,array('conditions'=>array('SppMasterList.un_id'=>$un_id),'limit'=>$limit,'page'=>$page));
			$count=$master->find('count',array('conditions'=>array('SppMasterList.un_id'=>$un_id)));
		}
		$dataAll = Set::extract($dataAll,'{n}.SppMasterList');
		$this->set('dataAll','{"total":'.$count.',"sppmasters":'.json_encode($dataAll).'}');
	}  
	function adddetail0(){
		Configure::write('debug',2);
		set_error_handler(array($this, 'handleError'));
		$this->layout = 'ajax';
			if ($this->data['SppDetail0']['dpam_no']!=''){
				$this->data['SppDetail0']['sppd_nilai']=r(',','',$this->data['SppDetail0']['sppd_nilai']); 
				$this->data['SppDetail0']['sppd_tersedia']=r(',','',$this->data['SppDetail0']['sppd_tersedia']); 
				$this->data['SppDetail0']['sppd_sisa']=r(',','',$this->data['SppDetail0']['sppd_sisa']); 
				$this->data['SppDetail0']['sppd_angg']=r(',','',$this->data['SppDetail0']['sppd_angg']); 
				App::import('Model','sppdetail0');
				$detail0=new SppDetail0;
				$check0=$detail0->findBySppm_id($this->data['SppDetail0']['sppm_id']);
				if(!empty($check0)){
					$detail0->sppd_id=$check0['SppDetail0']['sppd_id'];
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
		if(isset($_REQUEST['sppm_id']))
			$master_id = $_REQUEST['sppm_id'];
		else $master_id="";
		 
		App::import('Model','sppdetail0');
		$detail=new SppDetail0();
		 
		$dataAll=$detail->find('all' ,array('conditions'=>array('sppm_id'=>$master_id),'order'=>'sppd_id','limit'=>1));
		$count=$detail->find('count',array('conditions'=>array('sppm_id'=>$master_id)));
		 
		$dataAll = Set::extract($dataAll,'{n}.SppDetail0');
		$this->set('dataAll','{"total":'.$count.',"sppdetails":'.json_encode($dataAll).'}');
	}  
	 function add(){
		Configure::write('debug',2);
		set_error_handler(array($this, 'handleError'));
		$this->layout = 'ajax';
		App::import('Model','sppmaster');
		$sppmaster=new SppMaster;
	 
		if (!empty($this->data)) {
			    $admin=$this->Session->read('PB_USER_SESSION');

			  
				//check if user exists
			  	$this->data['SppMaster']['sppm_total']=r(',','',$this->data['SppMaster']['sppm_total']);
				$this->data['SppMaster']['sppm_sisaspd']=r(',','',$this->data['SppMaster']['sppm_sisaspd']);
			 		if (isset($this->params['form']['sppm_keglanjut']))
						$this->data['SppMaster']['sppm_keglanjut']=$this->params['form']['sppm_keglanjut'];
					else $this->data['SppMaster']['sppm_keglanjut']=1;
				$checkdata=$sppmaster->findBySppm_id($this->data['SppMaster']['sppm_id']);
				 if (empty($checkdata)) {
				 
					$sppmaster->create();
				 }
				 else {
				 	$sppmaster->sppm_id=$this->data['SppMaster']['sppm_id'];
				 }
				 
					try {
						if ($sppmaster->save($this->data)) {
						//	$newid=$salesmaster->getLastInsertID();
						if (isset($sppmaster->sppm_id)) $newid=$sppmaster->sppm_id;
						else $newid=$sppmaster->getLastInsertID();
							//
							#checkdetail0
							
							$newno=$this->data['SppMaster']['sppm_no'];
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
		App::import('Model','sppmasterlist');
		$sppmasterlist=new SppMasterList;
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
					array('lower(sppm_no)  LIKE' => "%$search%"),
					array('lower(un_kode) LIKE' =>"%$search%"),
					array('lower(un_nama) LIKE' =>"%$search%") 
				 )) 
			),
			'order'=> 'SppMasterList.sppm_tgl asc' ,'limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>
				array('OR'=>array(
						array('lower(sppm_no)  LIKE' => "%$search%"),
					array('lower(un_kode) LIKE' =>"%$search%"),
					array('lower(un_nama) LIKE' =>"%$search%") )) 
			));
		}
		else {
	  		$whereis=array(  'order'=>'SppMasterList.sppm_tgl asc','limit'=>$limit,'page'=>$page);
			$wherecount=array();
		}
		$dataAll=$sppmasterlist->find('all',$whereis);
		$count=$sppmasterlist->find('count',$wherecount);
 		 $this->set('dataAll','{"total":'.$count.',"sppmasters":'.json_encode($dataAll).'}');

	}
	 
  	function readdetail_2($form_no=0){
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','sppdetail2list');
		$detaillist=new SppDetail2List;
		$mid=0;
		if(isset($_POST['sppm_id']))
			$mid = $_POST['sppm_id'];
		$dataall=$detaillist->find('all',array('conditions'=>array('sppm_id'=>$mid),'order'=>'akun_kode'));
		$count=$detaillist->find('count',array('conditions'=>array('sppm_id'=>$mid)));
		 $results = Set::extract($dataall,'{n}.SppDetail2List');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	function createdetail_2(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		$this->layout='ajax';
			App::import('Model','sppdetail2');
		$detail=new SppDetail2;
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
					    $data1['SppDetail2'][$k]=$v;
                        $arr1[$k]=$v;
						 
                       
					}
                    $data1['SppDetail2']['sppm_id']=$masterid;
                    $data1['SppDetail2']['src_code']=null;
                   
				 	$detail->primaryKey="sppd_id";
					try {
						if ($detail->save($data1)){
							    if ($data1['SppDetail2']['sppd_id']=="0")
								    $arr1["sppd_id"]=($detail->getLastInsertID());
								$arr1["sppm_id"]=$masterid;
							 

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
					   $data1['SppDetail2'][$k]=$v;
                        $arr1[$k]=$v;
                       
					}
                    $data1['SppDetail2']['src_code']=null;
                    $data1['SppDetail2']['sppm_id']=$masterid;
				  
					$detail->primaryKey="sppd_id";
					try{
						if ($detail->save($data1)){
						        if ($data1['SppDetail2']['sppd_id']=="0")
                                    $arr1["sppd_id"]=($detail->getLastInsertID());  
								 
								 $arr1["sppm_id"]=$masterid;
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
		App::import('Model','sppdetail2');
		$detail=new SppDetail2;
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
                        $data1['SppDetail2'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['SppDetail2']['sppm_id']=$masterid;
                    $data1['SppDetail2']['src_code']=null;
                   
                    $detail->primaryKey="sppd_id";
                    try {
                        if ($detail->save($data1)){
                            if ($data1['SppDetail2']['sppd_id']=="0")
                                    $arr1["sppd_id"]=($detail->getLastInsertID());
                            $arr1["sppm_id"]=$masterid;
							 
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
                        $data1['SppDetail2'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['SppDetail2']['sppm_id']=$masterid;
                    $data1['SppDetail2']['src_code']=null;
                   
                    $detail->primaryKey="sppd_id";
                    try {
                        if ($detail->save($data1)){
								  if ($data1['SppDetail2']['sppd_id']=="0")
                                    $arr1["sppd_id"]=($detail->getLastInsertID());
								 $arr1["sppm_id"]=$masterid;
	
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
		App::import('Model','sppdetail2');
		$detail=new SppDetail2();
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
				$detail->primaryKey='sppd_id';
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
		App::import('Model','sppdetail1list');
		$detaillist=new SppDetail1List;
		$mid=0;
		if(isset($_POST['sppm_id']))
			$mid = $_POST['sppm_id'];
		$dataall=$detaillist->find('all',array('conditions'=>array('sppm_id'=>$mid)));
		$count=$detaillist->find('count',array('conditions'=>array('sppm_id'=>$mid)));
		 $results = Set::extract($dataall,'{n}.SppDetail1List');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	function createdetail_1(){
		set_error_handler(array($this, 'handleError'));
		Configure::write('debug',2);
		$this->layout='ajax';
			App::import('Model','sppdetail1');
		$detail=new SppDetail1;
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
					    $data1['SppDetail1'][$k]=$v;
                        $arr1[$k]=$v;
						 
                       
					}
                    $data1['SppDetail1']['sppm_id']=$masterid;
                    $data1['SppDetail1']['src_code']=null;
                   
				 	$detail->primaryKey="sppd_id";
					try {
						if ($detail->save($data1)){
							    if ($data1['SppDetail1']['sppd_id']=="0")
								    $arr1["sppd_id"]=($detail->getLastInsertID());
								$arr1["sppm_id"]=$masterid;
							 

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
					   $data1['SppDetail1'][$k]=$v;
                        $arr1[$k]=$v;
                       
					}
                    $data1['SppDetail1']['src_code']=null;
                    $data1['SppDetail1']['sppm_id']=$masterid;
				  
					$detail->primaryKey="sppd_id";
					try{
						if ($detail->save($data1)){
						        if ($data1['SppDetail1']['sppd_id']=="0")
                                    $arr1["sppd_id"]=($detail->getLastInsertID());  
								 
								 $arr1["sppm_id"]=$masterid;
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
		App::import('Model','sppdetail1');
		$detail=new SppDetail1;
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
                        $data1['SppDetail1'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['SppDetail1']['sppm_id']=$masterid;
                    $data1['SppDetail1']['src_code']=null;
                   
                    $detail->primaryKey="sppd_id";
                    try {
                        if ($detail->save($data1)){
                            if ($data1['SppDetail1']['sppd_id']=="0")
                                    $arr1["sppd_id"]=($detail->getLastInsertID());
                            $arr1["sppm_id"]=$masterid;
							 
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
                        $data1['Sppdetail1'][$k]=$v;
                        $arr1[$k]=$v;
                         
                       
                    }
                    $data1['SppDetail1']['sppm_id']=$masterid;
                    $data1['SppDetail1']['src_code']=null;
                   
                    $detail->primaryKey="sppd_id";
                    try {
                        if ($detail->save($data1)){
								  if ($data1['SppDetail1']['sppd_id']=="0")
                                    $arr1["sppd_id"]=($detail->getLastInsertID());
								 $arr1["sppm_id"]=$masterid;
	
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
		App::import('Model','sppdetail1');
		$detail=new SppDetail1();
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
				$detail->primaryKey='sppd_id';
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