<?php
class DpaController extends AppController
{
    var $name = 'dpa';
	var $uses=null;
	
	function index()
    {
		
     	
    }
	function readdetailbykeg($form_no=0){
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','dpadetaillist');
		$detaillist=new DpaDetailList;
		$mid=0;
		if(isset($_POST['keg_kode']))
			$mid = $_POST['keg_kode'];
		$dataall=$detaillist->find('all',array('conditions'=>array('keg_kode'=>$mid)));
		$count=$detaillist->find('count',array('conditions'=>array('keg_kode'=>$mid)));
		 $results = Set::extract($dataall,'{n}.DpaDetailList');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	function readdetailbyun($form_no=0){
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','dpabtl');
		$detaillist=new DpaBtl;
		$mid=0;
		if(isset($_POST['un_id']))
			$mid = $_POST['un_id'];
		$dataall=$detaillist->find('all',array('conditions'=>array('un_id'=>$mid)));
		$count=$detaillist->find('count',array('conditions'=>array('un_id'=>$mid)));
		 $results = Set::extract($dataall,'{n}.DpaBtl');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	function readdetailbyno($form_no=0){
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','dpadetaillist');
		$detaillist=new DpaDetailList;
		$mid=0;
		if(isset($_POST['dpam_no']))
			$mid = $_POST['dpam_no'];
		$dataall=$detaillist->find('all',array('conditions'=>array('dpam_no'=>$mid)));
		$count=$detaillist->find('count',array('conditions'=>array('dpam_no'=>$mid)));
		 $results = Set::extract($dataall,'{n}.DpaDetailList');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
	}
	function readdetail($form_no=0){
		Configure::write('debug',2);
		$this->layout='ajax';
		App::import('Model','dpadetaillist');
		$detaillist=new DpaDetail1List;
		$mid=0;
		if(isset($_POST['dpam_id']))
			$mid = $_POST['dpam_id'];
		$dataall=$detaillist->find('all',array('conditions'=>array('dpam_id'=>$mid)));
		$count=$detaillist->find('count',array('conditions'=>array('dpam_id'=>$mid)));
		 $results = Set::extract($dataall,'{n}.DpaDetailList');
		$this->set('data','{"total":'.$count.',"data":'.json_encode($results).'}');
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
		
	 	$this->layout='ajax';
		if(isset($_POST['start']))
			$start= $_POST['start'];
		 
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
		 
	 	$this->layout='ajax';
		if(isset($_POST['start']))
			$start= $_POST['start'];
		 
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
		 
	 	$this->layout='ajax';
		if(isset($_POST['start']))
			$start= $_POST['start'];
		 
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
	function searchdpabtlbyun(){
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
	 
		if(isset($_POST['un_id']))
			$master_id = $_POST['un_id'];
		else $master_id="";
		$page = ($start/$limit)+1;
		App::import('Model','dpabtl');
		$dpa=new DpaBtl();
		if ($key!=""){
			$key=strtolower($key);
		$ayear=date('YYYY');
		$whereis=array('conditions'=>array('AND'=>array('OR'=>array(array('lower(DpaBtl.akun_kode) LIKE '=>"%$key%"),
										array('lower(DpaBtl.akun_nama) LIKE '=>"%$key%"))),
										array('AND'=>array('DpaBtl.un_id'=>$master_id))),
									'order'=>'DpaBtl.akun_kode','limit'=>$limit,'page'=>$page);
		$wherecount=array('conditions'=>array('AND'=>array('OR'=>array(array('lower(DpaBtl.akun_kode) LIKE '=>"%$key%"),
										array('lower(DpaBtl.akun_nama) LIKE '=>"%$key%"))) ,
										array('AND'=>array('DpaBtl.un_id'=>$master_id))));
		$dataAll=$dpa->find('all',$whereis);
		$count=$dpa->find('count',$wherecount);
		}
		else {
			$dataAll=$dpa->find('all' ,array('conditions'=>array('DpaBtl.un_id'=>$master_id),'limit'=>$limit,'page'=>$page));
			$count=$dpa->find('count',array('conditions'=>array('DpaBtl.un_id'=>$master_id)));
		}
		$dataAll = Set::extract($dataAll,'{n}.DpaBtl');
		$this->set('dataAll','{"total":'.$count.',"dpadetails":'.json_encode($dataAll).'}');
	}  
	function searchdpadetailbykeg(){
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
	 
		if(isset($_POST['keg_kode']))
			$master_id = $_POST['keg_kode'];
		else $master_id="";
		$page = ($start/$limit)+1;
		App::import('Model','dpadetaillist');
		$dpa=new DpaDetailList();
		if ($key!=""){
			$key=strtolower($key);
		$ayear=date('YYYY');
		$whereis=array('conditions'=>array('AND'=>array('OR'=>array(array('lower(DpaDetailList.akun_kode) LIKE '=>"%$key%"),
										array('lower(DpaDetailList.akun_nama) LIKE '=>"%$key%"))),
										array('AND'=>array('DpaDetailList.keg_kode'=>$master_id))),
									'order'=>'DpaDetailList.akun_kode','limit'=>$limit,'page'=>$page);
		$wherecount=array('conditions'=>array('AND'=>array('OR'=>array(array('lower(DpaDetailList.akun_kode) LIKE '=>"%$key%"),
										array('lower(DpaDetailList.akun_nama) LIKE '=>"%$key%"))) ,
										array('AND'=>array('DpaDetailList.keg_kode'=>$master_id))));
		$dataAll=$dpa->find('all',$whereis);
		$count=$dpa->find('count',$wherecount);
		}
		else {
			$dataAll=$dpa->find('all' ,array('conditions'=>array('DpaDetailList.keg_kode'=>$master_id),'limit'=>$limit,'page'=>$page));
			$count=$dpa->find('count',array('conditions'=>array('DpaDetailList.keg_kode'=>$master_id)));
		}
		$dataAll = Set::extract($dataAll,'{n}.DpaDetailList');
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