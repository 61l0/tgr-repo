<?php
class PnsController extends AppController
{
    var $name = 'pns';
	var $uses=null;
	
	function index()
    {
		
     	
    }
	function searchbenda(){
		Configure::write('debug',2);
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
		App::import('Model','pns');
		$pns=new Pns();
		if ($key!=""){
			$key=strtolower($key);
		$whereis=array('conditions'=>array('OR'=>array(array('lower(Pns.pn_nip) LIKE '=>"%$key%"),
										array('lower(Pns.pn_nama) LIKE '=>"%$key%"))),
										array('AND'=>array(array('Pns.pn_jabatan LIKE' =>"Bendahara%"))),
									'order'=>'Pns.pn_nip','limit'=>$limit,'page'=>$page);
		$wherecount=array('conditions'=>array('OR'=>array(array('lower(Pns.pn_nip) LIKE '=>"%$key%"),
										array('lower(Pns.pn_nama) LIKE '=>"%$key%"))),
										array('AND'=>array(array('Pns.pn_jabatan LIKE' =>"Bendahara%"))));
		$dataAll=$pns->find('all',$whereis);
		$count=$pns->find('count',$wherecount);
		}
		else {
			$dataAll=$pns->find('all' ,array('limit'=>$limit,'page'=>$page));
			$count=$pns->find('count');
		}
		$dataAll = Set::extract($dataAll,'{n}.Pns');
		$this->set('dataAll','{"total":'.$count.',"pns":'.json_encode($dataAll).'}');
	}  
	
	function searchppkd(){
		Configure::write('debug',2);
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
		App::import('Model','pns');
		$pns=new Pns();
		if ($key!=""){
			$key=strtolower($key);
		$whereis=array('conditions'=>array('OR'=>array(array('lower(Pns.pn_nip) LIKE '=>"%$key%"),
										array('lower(Pns.pn_nama) LIKE '=>"%$key%"))),
										array('AND'=>array(array('Pns.pn_jabatan LIKE' =>"%"))),
									'order'=>'Pns.pn_nip','limit'=>$limit,'page'=>$page);
		$wherecount=array('conditions'=>array('OR'=>array(array('lower(Pns.pn_nip) LIKE '=>"%$key%"),
										array('lower(Pns.pn_nama) LIKE '=>"%$key%"))),
										array('AND'=>array(array('Pns.pn_jabatan LIKE' =>"%"))));
		$dataAll=$pns->find('all',$whereis);
		$count=$pns->find('count',$wherecount);
		}
		else {
			$dataAll=$pns->find('all' ,array('limit'=>$limit,'page'=>$page));
			$count=$pns->find('count');
		}
		$dataAll = Set::extract($dataAll,'{n}.Pns');
		$this->set('dataAll','{"total":'.$count.',"pns":'.json_encode($dataAll).'}');
	}  
}
?>