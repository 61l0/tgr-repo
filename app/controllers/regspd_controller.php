<?php
class RegspdController extends AppController
{
    var $name = 'regspd';
	var $uses=null;
	function getall(){
		Configure::write('debug',1);
		$this->layout='ajax';
	 	 
		App::import('Model','regspdlist');
		$data=new RegSpdList(); 
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
					array('lower(rs_no)  LIKE' => "%$search%"),
					array('lower(un_kode) LIKE' =>"%$search%"),
					array('lower(un_nama) LIKE' =>"%$search%") 
				 )) 
			),
			'order'=> 'RegSpdList.rs_id asc' ,'limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>
				array('OR'=>array(
						array('lower(rs_no)  LIKE' => "%$search%"),
					array('lower(un_kode) LIKE' =>"%$search%"),
					array('lower(un_nama) LIKE' =>"%$search%") )) 
			));
		}
		else {
	  		$whereis=array(  'order'=>'RegSpdList.rs_id asc','limit'=>$limit,'page'=>$page);
			$wherecount=array();
		}
		$dataAll=$data->find('all',$whereis);
		$count=$data->find('count',$wherecount);

		$this->set('dataAll','{"total":'.$count.',"regspds":'.json_encode($dataAll).'}');

	}
	function getallforcombo(){
		Configure::write('debug',1);
		$this->layout='ajax';
		 
		$brc_code=$this->Session->read('pb_brc_code');
		 //$brc_code='BR01';
		 if ($admin['brc_restricted']=="0") { 
			 $whereis=array('conditions'=>array('Regspd.mark <>' =>2,'Regspd.wh_active'=>1),'order'=>'Regspd.wh_code ASC');
		 }
		 else {
		 	$whereis=array('conditions'=>array('Regspd.brc_code'=>$brc_code,'Regspd.mark <>' =>2,'Regspd.wh_active'=>1),'order'=>'Regspd.wh_code ASC');
		 }
			$dataAll=$this->Regspd->find('all',$whereis);
			$count=$this->Regspd->find('count',$whereis);
 			 $dataArray = Set::extract($dataAll, '{n}.Regspd');  // use this code if you are using cake 1.2.xx
	 
		 

		$this->set('dataAll','{"total":'.$count.',"regspds":'.json_encode($dataArray).'}');

	}
	 
	function add(){
		Configure::write('debug',0);
		set_error_handler(array($this, 'handleError'));
		 $this->layout = 'ajax';
		if (!empty($this->data)) {
					App::import('Model','regspd');
					$data=new RegSpd(); 	
			 		if ($this->data['RegSpd']['rs_type']=="0")
						$data->create();
					
				 	try {
						if ($data->save($this->data)) {
							if ($this->data['RegSpd']['rs_type']=="0")
						 	$newid=$data->getLastInsertID();
							else $newid=$this->data['RegSpd']['rs_id'];
							$this->set('success', '{success:true,newid:"'.$newid.'"}');
						} else {
							$this->set('success', '{success:false,msg: "Could not save to database"}');
						}
					}
					catch(exception $e)
					{
					 	 $this->set('success', '{success:false,msg: '.json_encode(strip_tags(htmlspecialchars_decode($e->getMessage()))).'}');
					 
					  
					}
				 
			 
		}
	}
	function edit(){
		Configure::write('debug',0);
		set_error_handler(array($this, 'handleError'));
		 $this->layout = 'ajax';
		if (!empty($this->data)) {
			 $admin=$this->Session->read('PB_USER_SESSION');
 
			  		//print_r($this->params['form']);
					$this->Regspd->wh_code=$this->data['Regspd']['wh_code'];
					$this->Regspd->primaryKey='wh_code';
					$this->data['Regspd']['modi_by']=$admin['user_name'];
					$this->data['Regspd']['mark']=1; 
					$this->data['Regspd']['modi_date']=Date('Y-m-d h:i:s');
					 if (isset($this->params['form']['Regspd_wh_istransit']))
						$this->data['Regspd']['wh_istransit']=$this->params['form']['Regspd_wh_istransit'];
				 	else $this->data['Regspd']['wh_istransit']=0;
					try {
						if ($this->Regspd->save($this->data)) {
							$newid=$this->Regspd->getLastInsertID();
							$this->set('success', '{success:true}');
						} else {
							$this->set('success', '{success:false,msg: "Could not save to database"}');
						}
					}
					catch(exception $e)
					{
					 	 $this->set('success', '{success:false,msg: '.json_encode(strip_tags(htmlspecialchars_decode($e->getMessage()))).'}');
					 
					  
					}
		 
		}
	}
	function endis($id=0,$state=0){
		//** for enable/disable category
		Configure::write('debug',0);
		$this->layout = 'ajax';
		if(!empty($_REQUEST['id']))
			$id = $_REQUEST['id'];
		if(!empty($_REQUEST['state']))
			$state = $_REQUEST['state'];
		if ($id!=null){
			$admin=$this->Session->read('PB_USER_SESSION');
			 
			 	 	if ($state==0) $state=1;else $state=0;
					try { 
						$this->Regspd->updateAll(array('Regspd.wh_active'=>$state),array('Regspd.wh_code'=>$id));
						$this->set('success', '{success:true, msg: "Data has been updated"}');  //this is a json statement.  EXT forms need this to know if things worked
					 }
					catch(exception $e)
					{
					 	 $this->set('success', '{success:false,msg: '.json_encode(strip_tags(htmlspecialchars_decode($e->getMessage()))).'}');
					 
					  
					}
			 
		}
		else
		$this->set('success', '{success:false, msg: "Failed to update data"}');  //EXT forms need this to know if something went wrong

	}
	
	function del($id=null){
		Configure::write('debug',0);
		$this->layout = 'ajax';
		if(!empty($_REQUEST['id']))
			$id = $_REQUEST['id'];
		if ($id!=null){
			$admin=$this->Session->read('PB_USER_SESSION');
			 
				//check if it's admin, could not delete admin
			 
					$this->Regspd->wh_code=$id;
					$this->Regspd->primaryKey='wh_code';
					$this->data['Regspd']['wh_code']=$id;
					$this->data['Regspd']['mark']=2;//$this->User->delete($id);
					 $this->data['Regspd']['modi_by']=$admin['user_name'];
					$this->data['Regspd']['modi_date']=Date('Y-m-d h:i:s');
					if ($this->Regspd->save($this->data)) {
						$this->set('success', '{success:true,msg: "Data have been deleted"}');  //this is a json statement.  EXT forms need this to know if things worked
					
					}
					else {
						 $this->set('success', '{success:false,msg: '.json_encode(strip_tags(htmlspecialchars_decode($e->getMessage()))).'}');
					 
					}
				 
			 
		}
		else
		$this->set('success', 'Failed to delete record');  //EXT forms need this to know if something went wrong

	}
	function index()
    {
		
     	
    }
	 
  
}
?>