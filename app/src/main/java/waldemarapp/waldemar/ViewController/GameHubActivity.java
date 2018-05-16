package waldemarapp.waldemar.ViewController;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebView;

import java.io.IOException;
import java.io.InputStream;
import java.io.File;

public class GameHubActivity extends AppCompatActivity {

    /*========== VARS ===============================*/
    String spiel;
    Intent intent;


    /*========== LIFE CYCLE EVENTS ===============================*/
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // brauchen wir das hier dann noch?
        // setContentView(R.layout.activity_game_hub);
        WebView webview = new WebView(this);
        setContentView(webview);

        intent = getIntent();
        // get the game that was scanned
        setGame(intent);

        try {
            // read the HTML from the file
            InputStream fin = getAssets().open("prototyp/games/html/"+spiel+".html");
            byte[] buffer = new byte[fin.available()];
            fin.read(buffer);
            fin.close();

            // load the HTML
            webview.loadData(new String(buffer), "text/html", "UTF-8");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /*========== CUSTOM FUNCTIONS ===============================*/

    /*========== GETTER & SETTER ===============================*/

    public void setGame(Intent intent){
        Bundle bundle = intent.getExtras();
        if(bundle != null){
            spiel = bundle.getString("spielname");
        }
    }
}