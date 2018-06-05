package waldemarapp.waldemar.ViewController;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;

import java.io.IOException;
import java.io.InputStream;
import java.io.File;

import waldemarapp.waldemar.Helper.GameHubJsInterface;

public class GameHubActivity extends AppCompatActivity {

    /*========== VARS ===============================*/
    private static final String TAG = "GameHubActivity"; // Tag for logging in console

    String game;
    Intent intent;


    /*========== LIFE CYCLE EVENTS ===============================*/
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // brauchen wir das hier dann noch?
        // setContentView(R.layout.activity_game_hub);
        WebView webview = new WebView(this);
        setContentView(webview);

        // some standardsettings so webview behaves properly
        WebSettings webSettings = webview.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setLoadWithOverviewMode(true);
        webSettings.setUseWideViewPort(false);
        webSettings.setBuiltInZoomControls(true);
        webSettings.setDisplayZoomControls(false);
        webSettings.setSupportZoom(true);
        webSettings.setDefaultTextEncodingName("utf-8");
        webSettings.setTextZoom(100);

        // add JsInterface so we can call Android from JS
        webview.addJavascriptInterface(new GameHubJsInterface(this), "GameHub");

        intent = getIntent();
        // get the game that was scanned
        setGame(intent);

        /*try {
            // read the HTML from the file (path is: assets!)
            InputStream fin = getAssets().open("prototyp/games/"+game+"/index.html");
            byte[] buffer = new byte[fin.available()];
            fin.read(buffer);
            fin.close();

            // load the HTML
            webview.loadData(new String(buffer), "text/html", "UTF-8");

        } catch (IOException e) {
            e.printStackTrace();
        }*/

        // loadData doesn't load CSS, for whatever reason... so we have to use loadUrl
        webview.loadUrl("file:///android_asset/prototyp/games/"+game+"/index.html");
    }

    /*========== CUSTOM FUNCTIONS ===============================*/

    /*========== GETTER & SETTER ===============================*/

    // get the scanned game from the initial intent GameActivityHub was started with
    public void setGame(Intent intent){
        Bundle bundle = intent.getExtras();
        if(bundle != null){
            game = bundle.getString("name");
        }
    }
}