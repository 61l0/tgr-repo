<?php
class RekKoranController extends AppController
{
    var $name = 'rekkoran';
	var $uses=null;
	
	function index()
    {
		
     	
    }
	   function del($id=null){
		Configure::write('debug',0);
		$this->layout = 'ajax';
			App::import('Model','rekkoran');
		$rekkoran=new RekKoran;
		if(!empty($_REQUEST['id']))
			$id = $_REQUEST['id'];
		if ($id!=null){
			 
			 
				//check if it's admin, could not delete admin
			 	$rekkoran->delete($id);
				 
				 $this->set('success', '{success:true,msg: "Data have been deleted"}');  //this is a json statement.  EXT forms need this to know if things worked
			 
			 
		}
		else
		$this->set('success', 'Failed to delete record');  //EXT forms need this to know if something went wrong

	}
	 function add(){
		Configure::write('debug',2);
		set_error_handler(array($this, 'handleError'));
		$this->layout = 'ajax';
		App::import('Model','rekkoran');
		$rekkoran=new RekKoran;
	 
		if (!empty($this->data)) {
			    $admin=$this->Session->read('PB_USER_SESSION');
			
			  
				//check if user exists
			  	$this->data['RekKoran']['rk_nilaimasuk']=r(',','',$this->data['RekKoran']['rk_nilaimasuk']);
			   $this->data['RekKoran']['rk_nilaikeluar']=r(',','',$this->data['RekKoran']['rk_nilaikeluar']);
					 
				$checkdata=$rekkoran->findByRk_id($this->data['RekKoran']['rk_id']);
				 if (empty($checkdata)) {
				 
					$rekkoran->create();
				 }
				 else {
				 	$rekkoran->rk_id=$this->data['RekKoran']['rk_id'];
				 }
				 
					try {
						if ($rekkoran->save($this->data)) {
						//	$newid=$salesmaster->getLastInsertID();
						if (isset($rekkoran->rk_id)) $newid=$rekkoran->rk_id;
						else $newid=$rekkoran->getLastInsertID();
							//
							#checkdetail0
							
							$newno='0';
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
		App::import('Model','rekkoranlist');
		$rekkoranlist=new RekKoranList;
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
					 
					array('lower(bank_norek) LIKE' =>"%$search%"),
					array('lower(bank_nama) LIKE' =>"%$search%") 
				 )) 
			),
			'order'=> 'RekKoranList.rk_id asc' ,'limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>
				array('OR'=>array(
					 
					array('lower(bank_norek) LIKE' =>"%$search%"),
					array('lower(bank_nama) LIKE' =>"%$search%")  )) 
			));
		}
		else {
	  		$whereis=array(  'order'=>'RekKoranList.rk_id asc','limit'=>$limit,'page'=>$page);
			$wherecount=array();
		}
		$dataAll=$rekkoranlist->find('all',$whereis);
		$count=$rekkoranlist->find('count',$wherecount);
 		 $this->set('dataAll','{"total":'.$count.',"rekkoran":'.json_encode($dataAll).'}');

	}
	  
}
?>