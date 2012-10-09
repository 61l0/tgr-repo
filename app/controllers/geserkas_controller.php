<?php
class GeserKasController extends AppController
{
    var $name = 'geserkas';
	var $uses=null;
	
	function index()
    {
		
     	
    }
	   
	 function add(){
		Configure::write('debug',2);
		set_error_handler(array($this, 'handleError'));
		$this->layout = 'ajax';
		App::import('Model','geserkas');
		$geserkas=new GeserKas;
	 
		if (!empty($this->data)) {
			    $admin=$this->Session->read('PB_USER_SESSION');
			
			  
				//check if user exists
			  	$this->data['GeserKass']['gk_nilai']=r(',','',$this->data['GeserKass']['gk_nilai']);
					if (isset($this->params['form']['gk_tipe']))
						$this->data['GeserKass']['gk_tipe']=$this->params['form']['gk_tipe'];
					else $this->data['GeserKass']['gk_tipe']=1;
				$checkdata=$geserkas->findByGk_id($this->data['GeserKass']['gk_id']);
				 if (empty($checkdata)) {
				 
					$geserkas->create();
				 }
				 else {
				 	$geserkas->gk_id=$this->data['GeserKass']['gk_id'];
				 }
				 
					try {
						if ($geserkas->save($this->data)) {
						//	$newid=$salesmaster->getLastInsertID();
						if (isset($geserkas->gk_id)) $newid=$geserkas->gk_id;
						else $newid=$geserkas->getLastInsertID();
							//
							#checkdetail0
							
							$newno=$this->data['GeserKass']['gk_no'];
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
		App::import('Model','geserkaslist');
		$geserkaslist=new GeserKasList;
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
					array('lower(gk_no)  LIKE' => "%$search%"),
					array('lower(un_kode) LIKE' =>"%$search%"),
					array('lower(un_nama) LIKE' =>"%$search%") 
				 )) 
			),
			'order'=> 'GeserKasList.gk_tgl asc' ,'limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>
				array('OR'=>array(
						array('lower(gk_no)  LIKE' => "%$search%"),
					array('lower(un_kode) LIKE' =>"%$search%"),
					array('lower(un_nama) LIKE' =>"%$search%") )) 
			));
		}
		else {
	  		$whereis=array(  'order'=>'GeserKasList.gk_tgl asc','limit'=>$limit,'page'=>$page);
			$wherecount=array();
		}
		$dataAll=$geserkaslist->find('all',$whereis);
		$count=$geserkaslist->find('count',$wherecount);
 		 $this->set('dataAll','{"total":'.$count.',"geserkas":'.json_encode($dataAll).'}');

	}
	  
}
?>