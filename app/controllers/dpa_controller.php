<?php
class DpaController extends AppController
{
    var $name = 'dpa';
	var $uses=null;
	
	function index()
    {
		
     	
    }
	
	function searchmasterbtl(){
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
		App::import('Model','dpamasterbtl');
		$dpa=new DpaMasterBtl();
		if(isset($_POST['un_id']))
			$un_id = $_POST['un_id'];
		else $un_id="";
		if ($key!=""){
			$key=strtolower($key);
		$ayear=date('YYYY');
		
		$whereis=array('conditions'=>array('AND'=>array('OR'=>array(array('lower(DpaMasterBtl.dpam_no) LIKE '=>"%$key%"),
										array('lower(DpaMasterBtl.un_nama) LIKE '=>"%$key%"))),
										array('AND'=>array('DpaMasterBtl.un_id'=>$un_id))),
									'order'=>'DpaMasterBtl.dpam_no','limit'=>$limit,'page'=>$page);
		$wherecount=array('conditions'=>array('AND'=>array('OR'=>array(array('lower(DpaMasterBtl.dpam_no) LIKE '=>"%$key%"),
										array('lower(DpaMasterBtl.un_nama) LIKE '=>"%$key%"))) ,
										array('AND'=>array('DpaMasterBtl.un_id'=>$un_id))));
		$dataAll=$dpa->find('all',$whereis);
		$count=$dpa->find('count',$wherecount);
		}
		else {
			$dataAll=$dpa->find('all' ,array('conditions'=>array('DpaMasterBtl.un_id'=>$un_id),'limit'=>$limit,'page'=>$page));
			$count=$dpa->find('count',array('conditions'=>array('DpaMasterBtl.un_id'=>$un_id)));
		}
		$dataAll = Set::extract($dataAll,'{n}.DpaMasterBtl');
		$this->set('dataAll','{"total":'.$count.',"dpamasters":'.json_encode($dataAll).'}');
	}  
	function searchmasterbl(){
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
		if(isset($_POST['un_id']))
			$un_id = $_POST['un_id'];
		else $un_id="";
		$page = ($start/$limit)+1;
		App::import('Model','dpamasterbl');
		$dpa=new DpaMasterBl();
		if ($key!=""){
			$key=strtolower($key);
		$ayear=date('YYYY');
		$whereis=array('conditions'=>array('AND'=>array('OR'=>array(array('lower(DpaMasterBl.dpam_no) LIKE '=>"%$key%"),
										array('lower(DpaMasterBl.un_nama) LIKE '=>"%$key%"))),
										array('AND'=>array('DpaMasterBl.un_id'=>$un_id))),
									'order'=>'DpaMasterBl.dpam_no','limit'=>$limit,'page'=>$page);
		$wherecount=array('conditions'=>array('AND'=>array('OR'=>array(array('lower(DpaMasterBl.dpam_no) LIKE '=>"%$key%"),
										array('lower(DpaMasterBl.un_nama) LIKE '=>"%$key%"))) ,
										array('AND'=>array('DpaMasterBl.un_id'=>$un_id))));
		$dataAll=$dpa->find('all',$whereis);
		$count=$dpa->find('count',$wherecount);
		}
		else {
			$dataAll=$dpa->find('all' ,array('conditions'=>array('DpaMasterBl.un_id'=>$un_id),'limit'=>$limit,'page'=>$page));
			$count=$dpa->find('count',array('conditions'=>array('DpaMasterBl.un_id'=>$un_id)));
		}
		$dataAll = Set::extract($dataAll,'{n}.DpaMasterBl');
		$this->set('dataAll','{"total":'.$count.',"dpamasters":'.json_encode($dataAll).'}');
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
	function dpabtllist(){
		Configure::write('debug',1);
		$this->layout = 'ajax';
		$limit=10;$start=0;
		if(isset($_POST['master_id']))
			$master_id = $_POST['master_id'];
		else $master_id="";
		 
		App::import('Model','dpabtl');
		$dpa=new DpaBtl();
		 
		$dataAll=$dpa->find('all' ,array('conditions'=>array('dpam_no'=>$master_id),'order'=>'akun_kode'));
		$count=$dpa->find('count',array('conditions'=>array('dpam_no'=>$master_id)));
		 
		$dataAll = Set::extract($dataAll,'{n}.DpaBtl');
		$this->set('dataAll','{"total":'.$count.',"dpadetails":'.json_encode($dataAll).'}');
	}  
	function searchdpabtl(){
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
	 
		if(isset($_POST['master_id']))
			$master_id = $_POST['master_id'];
		else $master_id="";
		$page = ($start/$limit)+1;
		App::import('Model','dpabtl');
		$dpa=new DpaBtl();
		if ($key!=""){
			$key=strtolower($key);
		$ayear=date('YYYY');
		$whereis=array('conditions'=>array('AND'=>array('OR'=>array(array('lower(DpaBtl.akun_kode) LIKE '=>"%$key%"),
										array('lower(DpaBtl.akun_nama) LIKE '=>"%$key%"))),
										array('AND'=>array('DpaBtl.dpam_no'=>$master_id))),
									'order'=>'DpaBtl.akun_kode','limit'=>$limit,'page'=>$page);
		$wherecount=array('conditions'=>array('AND'=>array('OR'=>array(array('lower(DpaBtl.akun_kode) LIKE '=>"%$key%"),
										array('lower(DpaBtl.akun_nama) LIKE '=>"%$key%"))) ,
										array('AND'=>array('DpaBtl.dpam_no'=>$master_id))));
		$dataAll=$dpa->find('all',$whereis);
		$count=$dpa->find('count',$wherecount);
		}
		else {
			$dataAll=$dpa->find('all' ,array('conditions'=>array('DpaBtl.dpam_no'=>$master_id),'limit'=>$limit,'page'=>$page));
			$count=$dpa->find('count',array('conditions'=>array('DpaBtl.dpam_no'=>$master_id)));
		}
		$dataAll = Set::extract($dataAll,'{n}.DpaBtl');
		$this->set('dataAll','{"total":'.$count.',"dpadetails":'.json_encode($dataAll).'}');
	}  
	
	function searchdpabl(){
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
	 	//bl berdasarkan un_id
		if(isset($_POST['un_id']))
			$un_id = $_POST['un_id'];
		else $un_id="";
		$page = ($start/$limit)+1;
		App::import('Model','dpabl');
		$dpa=new DpaBl();
		if ($key!=""){
			$key=strtolower($key);
		$ayear=date('YYYY');
		$whereis=array('conditions'=>array('AND'=>array('OR'=>array(array('lower(DpaBl.keg_kode) LIKE '=>"%$key%"),
										array('lower(DpaBl.keg_nama) LIKE '=>"%$key%"),
										array('lower(DpaBl.dpam_no) LIKE '=>"%$key%"))),
										array('AND'=>array('DpaBl.un_id'=>$un_id))),
									'order'=>'DpaBl.keg_kode','limit'=>$limit,'page'=>$page);
		$wherecount=array('conditions'=>array('AND'=>array('OR'=>array(array('lower(DpaBl.keg_kode) LIKE '=>"%$key%"),
										array('lower(DpaBl.keg_nama) LIKE '=>"%$key%"),
										array('lower(DpaBl.dpam_no) LIKE '=>"%$key%"))) ,
										array('AND'=>array('DpaBl.un_id'=>$un_id))));
		$dataAll=$dpa->find('all',$whereis);
		$count=$dpa->find('count',$wherecount);
		}
		else {
			$dataAll=$dpa->find('all' ,array('conditions'=>array('DpaBtl.un_id'=>$un_id),'limit'=>$limit,'page'=>$page));
			$count=$dpa->find('count',array('conditions'=>array('DpaBtl.un_id'=>$un_id)));
		}
		$dataAll = Set::extract($dataAll,'{n}.DpaBl');
		$this->set('dataAll','{"total":'.$count.',"dpadetails":'.json_encode($dataAll).'}');
	}  
}
?>