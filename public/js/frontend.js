"use strict";

angular.module("NoteDataDemo", [
  "ngResource",
  "ngSanitize",
]);

angular.module("NoteDataDemo")
  // 紙幣データを取得するサービス
  .factory("dbNotes", ["$resource", ($resource) => {
    return $resource("/api/noteItems", {});
  }]);

angular.module("NoteDataDemo")

  // inject the dbNotes service factory into controller
  .controller("mainController", ["$scope", "dbNotes", ($scope, dbNotes) => {
    $scope.formNoteData = {};

    // GET =====================================================================
    // ページがロードされるときにすべてのデータを取得して表示する
    // frontService.js の get へ
    dbNotes.query().$promise
      .then(data => $scope.formNoteArray = data)
      .catch(err => $scope.error = err);

    // CREATE ==================================================================
    // button add が押されたときのアクション
    $scope.addNoteData = () => {
      if ($scope.formNoteData.sn != undefined) {
        // frontService.js の create へ
        dbNotes.save($scope.formNoteData)
          .then(data => $scope.formNoteArray.push(data))
          .catch(err => $scope.error = err);
      }
    };

    // DELETE ==================================================================
    // checkbox del がクリックされたときのアクション
    $scope.deleteNoteData = (id) => {
      // frontService.js の delete
      dbNotes.remove(id)
        .then(data => $scope.formNoteArray.push(data))
        .catch(err => $scope.error = err);
    };
  }]);
