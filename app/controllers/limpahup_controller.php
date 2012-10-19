<?php
class LimpahUpController extends AppController
{
    var $name = 'limpahup';
	var $uses=null;
	
	function index()
    {
		
     	
    }
	   
	 function add(){
		Configure::write('debug',2);
		set_error_handler(array($this, 'handleError'));
		$this->layout = 'ajax';
		App::import('Model','limpahup');
		$limpahup=new LimpahUp;
	 
		if (!empty($this->data)) {
			    $admin=$this->Session->read('PB_USER_SESSION');
			
			  
				//check if user exists
			  	$this->data['LimpahUp']['lu_nilai']=r(',','',$this->data['LimpahUp']['lu_nilai']);
				$ayear=date('Y');
			 
				$this->data['LimpahUp']['lu_tahun']=$ayear;
				$checkdata=$limpahup->findByLu_id($this->data['LimpahUp']['lu_id']);
				 if (empty($checkdata)) {
				 
					$limpahup->create();
				 }
				 else {
				 	$limpahup->lu_id=$this->data['LimpahUp']['lu_id'];
				 }
				 
					try {
						if ($limpahup->save($this->data)) {
						//	$newid=$salesmaster->getLastInsertID();
						if (isset($limpahup->lu_id)) $newid=$limpahup->lu_id;
						else $newid=$limpahup->getLastInsertID();
							//
							#checkdetail0
							
							$newno=$this->data['LimpahUp']['lu_no'];
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
		App::import('Model','limpahuplist');
		$limpahuplist=new LimpahUpList;
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
					array('lower(lu_no)  LIKE' => "%$search%"),
					array('lower(un_kode) LIKE' =>"%$search%"),
					array('lower(un_nama) LIKE' =>"%$search%") 
				 )) 
			),
			'order'=> 'LimpahUpList.lu_tgl asc' ,'limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>
				array('OR'=>array(
						array('lower(lu_no)  LIKE' => "%$search%"),
					array('lower(un_kode) LIKE' =>"%$search%"),
					array('lower(un_nama) LIKE' =>"%$search%") )) 
			));
		}
		else {
	  		$whereis=array(  'order'=>'LimpahUpList.lu_tgl asc','limit'=>$limit,'page'=>$page);
			$wherecount=array();
		}
		$dataAll=$limpahuplist->find('all',$whereis);
		$count=$limpahuplist->find('count',$wherecount);
 		 $this->set('dataAll','{"total":'.$count.',"limpahup":'.json_encode($dataAll).'}');

	}
	  
}
?>