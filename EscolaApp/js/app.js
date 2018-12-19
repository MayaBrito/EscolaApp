var escolaApp = angular.module("EscolaApp", ["ui.router"], ['ngMdIcons']);
        
//Controllers e Factorys 
var baseUrl = "http://mobile-aceite.tcu.gov.br:80/nossaEscolaRS";

var escolaApi = function ($http) {

    var _getEscolas = function () {
      return $http.get(baseUrl + "/rest/escolas/");
    };

    var _getMediaEscola = function (codEscola) {
      return $http.get(baseUrl + "/rest/escolas/" + codEscola + "/avaliacoes/media");
    };

    var _getEscola = function (codEscola) {
      return $http.get(baseUrl + "/rest/escolas/" + codEscola);
    };

    var _getTiposAvaliacoes = function (codEscola, tipo) {
      return $http.get(baseUrl + "/rest/escolas/" + codEscola + "/avaliacoes/tipo/" + tipo);
    };

    var _getEscolaAvaliacoes = function (codEscola) {
      return $http.get(baseUrl + "/rest/escolas/" + codEscola + "/avaliacoes");
    };

    var _getEscolaAvaliacoesAno = function (codEscola, ano) {
      return $http.get(baseUrl + "/rest/escolas/" + codEscola + "/avaliacoes/ano/" + ano);
    };

    return {
        getEscolas: _getEscolas,
        getMediaEscola: _getMediaEscola,
        getEscola: _getEscola,
        getTiposAvaliacoes: _getTiposAvaliacoes,
        getEscolaAvaliacoes: _getEscolaAvaliacoes,
        getEscolaAvaliacoesAno: _getEscolaAvaliacoesAno//Função privada do JS deixando publico 
    };
}

var tipoAvaliacaoApi = function ($http) {
    var _getTiposAvaliacao = function () {
      return $http.get(baseUrl + "/rest/tiposavaliacao");
    };

    return {
        getTiposAvaliacao: _getTiposAvaliacao //Função privada do JS deixando publico 
    };
}

escolaApp.factory("escolaApi", escolaApi);
escolaApp.factory("tipoAvaliacaoApi", tipoAvaliacaoApi);

// Controllers
var listarEscolaCtrl = function($scope, escolaApi) {

    $scope.escolas = [];
    $scope.quantidades = [10,20,30,40,50,100];


    $scope.listarEscola = function() {
      escolaApi.getEscolas()
            .then(function (response) {
                $scope.escolas = response.data;
            })
            .catch(function (error) {
                console.error(error);
            });
    }
};

var mediaEscolaCtrl = function($scope, escolaApi) {

    $scope.media = 0;

    $scope.pesquisarMediaEscola = function(codEscola) {
      escolaApi.getMediaEscola(codEscola)
            .then(function (response) {
                $scope.media = response.data.media;
            })
            .catch(function (error) {
                console.error(error);
            });
    }
};

var pesquisarEscolaCtrl = function($scope, escolaApi) {
    $scope.escola = {};
    $scope.pesquisar = function(codEscola) {
      escolaApi.getEscola(codEscola)
            .then(function (response) {
                $scope.escola = response.data;
            })
            .catch(function (error) {
                console.error(error);
            });
    }
};

var tiposAvaliacoesCtrl = function($scope, tipoAvaliacaoApi) {
    $scope.tiposAvaliacao = [];
    $scope.listar = function() {
      tipoAvaliacaoApi.getTiposAvaliacao()
            .then(function (response) {
                $scope.tiposAvaliacao = response.data;
            })
            .catch(function (error) {
                console.error(error);
            });
    }
};

var listarTipoAvaliacaoCtrl = function($scope, escolaApi) {
    $scope.tipos = [];
    $scope.listarTiposAvaliacao = function(codEscola, tipo) {
      escolaApi.getTiposAvaliacoes(codEscola, tipo)
            .then(function (response) {
                $scope.tipos = response.data;
            })
            .catch(function (error) {
                console.error(error);
            });
    }
};

var avaliacaoEscolaCtrl = function($scope, escolaApi) {
    $scope.avaliacoes = [];
    $scope.escolaAvaliacoes = function(codEscola) {
      escolaApi.getEscolaAvaliacoes(codEscola)
            .then(function (response) {
                $scope.avaliacoes = response.data;
            })
            .catch(function (error) {
                console.error(error);
            });
    }
};

var avaliacaoAnoEscolaCtrl = function($scope, escolaApi) {
    $scope.avaliacoesAno = [];
    $scope.escolaAvaliacoesAno = function(codEscola, ano) {
      escolaApi.getEscolaAvaliacoesAno(codEscola, ano)
            .then(function (response) {
                $scope.avaliacoesAno = response.data;
            })
            .catch(function (error) {
                console.error(error);
            });
    }
};

escolaApp.controller("ListarEscolaCtrl", listarEscolaCtrl);
escolaApp.controller("MediaEscolaCtrl", mediaEscolaCtrl);
escolaApp.controller("PesquisarEscolaCtrl", pesquisarEscolaCtrl);
escolaApp.controller("TiposAvaliacoesCtrl", tiposAvaliacoesCtrl);
escolaApp.controller("ListarTipoAvaliacaoCtrl", listarTipoAvaliacaoCtrl);
escolaApp.controller("AvaliacaoEscolaCtrl", avaliacaoEscolaCtrl);
escolaApp.controller("AvaliacaoAnoEscolaCtrl", avaliacaoAnoEscolaCtrl);

//Configuração das rotas
escolaApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/home");

    var homeState = {
        url: '/home',
        templateUrl: 'home.html'
    }

    var listarEscolaState = {
        url: '/listar',
        templateUrl: 'listarEscolas.html',
        controller: 'ListarEscolaCtrl'
    }

    var listarMediaEscolaState = {
        url: '/media',
        templateUrl: 'listarMediaEscola.html',
        controller: 'MediaEscolaCtrl'
    }

    var pesquisarEscolaState = {
        url: '/pesquisar',
        templateUrl:'pesquisarEscola.html',
        controller: 'PesquisarEscolaCtrl'            
    }
    
    var listarTiposAvaliacaoState = {
        url: '/tipoavaliacao',
        templateUrl: 'listarTiposAvaliacao.html',
        controller: 'TiposAvaliacoesCtrl'
    }
    
    var listarTipoTEscolaState = {
        url: '/tipot',
        templateUrl: 'listarTipoAvaliacaoPeloTipo.html',
        controller: 'ListarTipoAvaliacaoCtrl'
    }
    
    var avaliacaoEscolaState = {
        url: '/avaliacao',
        templateUrl:'listarAvaliacoes.html',
        controller: 'AvaliacaoEscolaCtrl'
    }
            
    var avaliacaoAnoEscolaState = {
        url: '/avaliacaoAno',
        templateUrl: 'listarAvaliacaoPorAno.html',
        controller: 'AvaliacaoAnoEscolaCtrl'
    }


    $stateProvider.state('home', homeState);
    $stateProvider.state('listar', listarEscolaState);
    $stateProvider.state('media', listarMediaEscolaState);
    $stateProvider.state('pesquisar', pesquisarEscolaState);
    $stateProvider.state('tipoavaliacao', listarTiposAvaliacaoState);
    $stateProvider.state('tipot', listarTipoTEscolaState);
    $stateProvider.state('avaliacao', avaliacaoEscolaState);
    $stateProvider.state('avaliacaoAno', avaliacaoAnoEscolaState);


});