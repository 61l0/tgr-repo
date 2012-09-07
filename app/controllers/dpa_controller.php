<?php
class DpaController extends AppController
{
    var $name = 'dpa';
	var $uses=null;
	
	function index()
    {
		
     	
    }
	function searchdpa(){
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
		App::import('Model','dpamasterlist');
		$dpa=new DpaMasterList();
		if ($key!=""){
			$key=strtolower($key);
		$ayear=date('YYYY');
		$whereis=array('conditions'=>array('OR'=>array(array('lower(DpaMasterList.dpam_no) LIKE '=>"%$key%"),
										array('lower(DpaMasterList.un_nama) LIKE '=>"%$key%"))),
									'order'=>'DpaMasterList.dpam_no','limit'=>$limit,'page'=>$page);
		$wherecount=array('conditions'=>array('OR'=>array(array('lower(DpaMasterList.dpam_no) LIKE '=>"%$key%"),
										array('lower(DpaMasterList.un_nama) LIKE '=>"%$key%"))) );
		$dataAll=$dpa->find('all',$whereis);
		$count=$dpa->find('count',$wherecount);
		}
		else {
			$dataAll=$dpa->find('all' ,array('limit'=>$limit,'page'=>$page));
			$count=$dpa->find('count');
		}
		$dataAll = Set::extract($dataAll,'{n}.DpaMasterList');
		$this->set('dataAll','{"total":'.$count.',"dpamasters":'.json_encode($dataAll).'}');
	}  
}
?>