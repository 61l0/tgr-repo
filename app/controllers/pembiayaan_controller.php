<?php
class PembiayaanController extends AppController
{
    var $name = 'pembiayaan';
	var $uses=null;
	
	function index()
    {
		
     	
    }
	   
	 function add(){
		Configure::write('debug',2);
		set_error_handler(array($this, 'handleError'));
		$this->layout = 'ajax';
		App::import('Model','pembiayaan');
		$pembiayaan=new Pembiayaan;
	 
		if (!empty($this->data)) {
			    $admin=$this->Session->read('PB_USER_SESSION');
			
			  
				//check if user exists
			  	$this->data['Pembiayaan']['bia_nilai']=r(',','',$this->data['Pembiayaan']['bia_nilai']);
					if (isset($this->params['form']['bia_tipe']))
						$this->data['Pembiayaan']['bia_tipe']=$this->params['form']['bia_tipe'];
					else $this->data['Pembiayaan']['bia_tipe']=1;
				$checkdata=$pembiayaan->findByBia_id($this->data['Pembiayaan']['bia_id']);
				 if (empty($checkdata)) {
				 
					$pembiayaan->create();
				 }
				 else {
				 	$pembiayaan->bia_id=$this->data['Pembiayaan']['bia_id'];
				 }
				 
					try {
						if ($pembiayaan->save($this->data)) {
						//	$newid=$salesmaster->getLastInsertID();
						if (isset($pembiayaan->bia_id)) $newid=$pembiayaan->bia_id;
						else $newid=$pembiayaan->getLastInsertID();
							//
							#checkdetail0
							
							$newno=$this->data['Pembiayaan']['bia_no'];
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
		App::import('Model','pembiayaanlist');
		$pembiayaanlist=new PembiayaanList;
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
					array('lower(bia_no)  LIKE' => "%$search%"),
					array('lower(akun_kode) LIKE' =>"%$search%"),
					array('lower(akun_nama) LIKE' =>"%$search%") 
				 )) 
			),
			'order'=> 'PembiayaanList.bia_tgl asc' ,'limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>
				array('OR'=>array(
						array('lower(bia_no)  LIKE' => "%$search%"),
					array('lower(akun_kode) LIKE' =>"%$search%"),
					array('lower(akun_nama) LIKE' =>"%$search%") )) 
			));
		}
		else {
	  		$whereis=array(  'order'=>'PembiayaanList.bia_tgl asc','limit'=>$limit,'page'=>$page);
			$wherecount=array();
		}
		$dataAll=$pembiayaanlist->find('all',$whereis);
		$count=$pembiayaanlist->find('count',$wherecount);
 		 $this->set('dataAll','{"total":'.$count.',"pembiayaan":'.json_encode($dataAll).'}');

	}
	  
}
?>