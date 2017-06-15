const dbModelNote = require('./models/note');

// APIのレスポンスを返す処理
// すべてのデータを取得して返す
const getNoteData = (res) => {
  dbModelNote.find((err, notes) => {
    if (err) {
      res.send(err);
    }

    // REST
    res.json(notes);
  });
};

module.exports = (app) => {
  // api ---------------------------------------------------------------------
  // すべてのデータを取得して返す
  app.get('/api/noteItems', (req, res) => {
    getNoteData(res);
  });

  // データを登録し、すべてのデータを再取得して返す
  app.post('/api/noteItems', (req, res) => {
    // AngularからのAJAXリクエストのデータ
    dbModelNote.create(req.body)
      .then((err, notes) => {
        if (err) res.send(err);
        getNoteData(res);
      });
  });

  // データを削除し、すべてのデータを再取得して返す
  app.delete('/api/noteItems/:note_id', (req, res) => {
    dbModelNote.remove({ _id: req.params.note_id }, (err, notes) => {
      if (err) res.send(err);
      getNoteData(res);
    });
  });

  // application -------------------------------------------------------------
  // 画面遷移はangularがフロントエンドで行うので単一ページを返すようにする
  app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });
};
