<?php
class SkpdController extends AppController
{
    var $name = 'skpd';
	var $uses=null;
	
	function index()
    {
		
     	
    }
	
	function searchskpd(){
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
		App::import('Model','skpdlist');
		$skpd=new SkpdList();
		$ayear=date('Y');
		 
		if ($key!=""){
			$key=strtolower($key);
		
			$whereis=array('conditions'=>array('OR'=>array(array('lower(SkpdList.un_kode) LIKE '=>"%$key%"),
											array('lower(SkpdList.un_nama) LIKE '=>"%$key%"))),
											array('AND'=>array(array('SkpdList.dpa_year' =>$ayear))),
										'order'=>'SkpdList.un_kode','limit'=>$limit,'page'=>$page);
			$wherecount=array('conditions'=>array('OR'=>array(array('lower(SkpdList.un_kode) LIKE '=>"%$key%"),
											array('lower(SkpdList.un_nama) LIKE '=>"%$key%"))),
												array('AND'=>array(array('SkpdList.dpa_year' =>$ayear))));
			$dataAll=$skpd->find('all',$whereis);
			$count=$skpd->find('count',$wherecount);
		}
		else {
			$dataAll=$skpd->find('all' ,array('conditions'=>array('SkpdList.dpa_year'=>$ayear),'limit'=>$limit,'page'=>$page));
			$count=$skpd->find('count',array('conditions'=>array('SkpdList.dpa_year'=>$ayear)));
		}
		$dataAll = Set::extract($dataAll,'{n}.SkpdList');
		$this->set('dataAll','{"total":'.$count.',"skpds":'.json_encode($dataAll).'}');
	}  
}
?>