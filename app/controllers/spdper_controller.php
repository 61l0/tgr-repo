<?php
class SpdperController extends AppController
{
    var $name = 'spdper';
	var $uses=null;
	
	function index()
    {
		
     	
    }
	function getall(){
		
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','spdpermasterlist');
		$spdpermasterlist=new SpdperMasterList;
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
					array('lower(spdm_no)  LIKE' => "%$search%"),
					array('lower(un_kode) LIKE' =>"%$search%"),
					array('lower(un_nama) LIKE' =>"%$search%") 
				 )) 
			),
			'order'=> 'SpdperMasterList.spdm_tgl asc' ,'limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('AND'=>
				array('OR'=>array(
						array('lower(spdm_no)  LIKE' => "%$search%"),
					array('lower(un_kode) LIKE' =>"%$search%"),
					array('lower(un_nama) LIKE' =>"%$search%") )) 
			));
		}
		else {
	  		$whereis=array(  'order'=>'SpdperMasterList.spdm_tgl asc','limit'=>$limit,'page'=>$page);
			$wherecount=array();
		}
		$dataAll=$spdpermasterlist->find('all',$whereis);
		$count=$spdpermasterlist->find('count',$wherecount);
 		 $this->set('dataAll','{"total":'.$count.',"spdpermasters":'.json_encode($dataAll).'}');

	}
	 
  
}
?>