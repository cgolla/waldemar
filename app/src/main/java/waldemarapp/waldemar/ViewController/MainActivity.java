package waldemarapp.waldemar.ViewController;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Handler;
import android.support.annotation.Nullable;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;

import com.wikitude.architect.ArchitectStartupConfiguration;
import com.wikitude.architect.ArchitectView;

import java.io.IOException;

import waldemarapp.waldemar.Helper.WikitudeCallbackListener;
import waldemarapp.waldemar.R;

/**
 * The MainActivity where markers can be scanned.
 */
public class MainActivity extends AppCompatActivity {

    /*========== VARS ===============================*/
    // Statics
    private static final String TAG = "MainActivity"; // Tag for logging in console
    private static final String WIKITUDE_KEY = "Hp/fXCJzZARFV7BHmgN9jCn6OBerUtUPX4mF+2gHUV8zfq1tyxUWdrrnGodkDrM5mcqfq8H5udGDcHVJ/M/Hvezoa9nH0BaMpW/fRiJxFr/A4SWaL5Rokl80uazjrJvGX1WrE/OGVVKYkwO9N33KPbZ0MbHp4chQB95Z7M8k1kNTYWx0ZWRfX6XJ+mvnPZ8m15Lu5AQutwKqPx4HGlN1S2rmFw81DERjkY3l2M8Ek4fiK7cMPw2eH6BiBihHRi1a2eGBZ1eA6v8yONwKVSdPp6ScIClHTi94tRfixwg3ORDh/eWIKUJF49mTzMw6D+iqekHmWK3l4V6MUuNCmYvkzTz8gRFQMe+QAspnV50k9guTiIflynztBnIZc8XdfUMBKra8HMLyKqUuRqj0OLs3Biv+jAxVHJvJdgo2BcLAaXVysySImAwY/oAvmf5+x/xkaAW0excDl2mdEbMVaPd2nPx9/SCAGxwXPefyMKmdVwuO1A8EP4aY69wFKzzzJJbYl4efOjv0QCvRhaRTGsnCz2maJTwZIewO7NvZ6GivMBK6F8HiZKeN/32vfnWx2qtAUjnjMchqVGK3schnSpTfGhkX5qMSwUkxqX3iv6VI6dsUMj0i15m8tGDK/xiLlan8D4vtoEFeVJQgoexYnFWS9HROybQWFH1JnFkdCw0NnWX+4LN7Fd9rUJQPDr/KRLKs3Pl/sCnlq3HMYmikqSXTMg==";
    private static final int CAMERA_PERMISSION_CODE = 221; //random number necessary to request camera permission


    // UI Elements
    private ArchitectView architectView;
    private Button scanBtn; //Button to start/stop scanning for markers

    // Status
    private boolean isScanning; //true if wikitude is loading AR World (or tries to)

    // etc.
    private WikitudeCallbackListener Helper; // Listens for info on what was scanned
    private Handler mHandler;

    /*========== LIFE CYCLE EVENTS ===============================*/

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //Init Wikitude
        this.architectView = (ArchitectView)this.findViewById( R.id.architectView_main );
        final ArchitectStartupConfiguration config = new ArchitectStartupConfiguration();
        config.setLicenseKey(WIKITUDE_KEY);
        cameraPermission();
        this.architectView.onCreate( config );

        this.isScanning = false;

        //Init UI elements
        this.scanBtn = (Button)this.findViewById(R.id.btn_scanstart);

        // Init Callbacklistener WikitudeCallbackListener
        Helper = new WikitudeCallbackListener(MainActivity.this);
        architectView.registerWorldLoadedListener(Helper);
        architectView.addArchitectJavaScriptInterfaceListener(Helper);

        this.mHandler = new Handler();
    }

    @Override
    protected void onPostCreate(@Nullable Bundle savedInstanceState) {
        super.onPostCreate(savedInstanceState);
        architectView.onPostCreate(); //this is what starts the camera

        //scanBtn verzögert einblenden (gibt Wikitude Zeit zum Laden)
        scanBtn.animate()
                .alpha(1.0f)
                .setStartDelay(3500)
                .setDuration(700);

        //start scanning / loading arWorld on click
        scanBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Scan starten
                if(!isScanning){
                    startScanning();
                }
                // Scan beenden
                else {
                    stopScanning();
                }
            }
        });
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        architectView.onDestroy();
    }

    @Override
    protected void onPause() {
        super.onPause();
        architectView.onPause();
        stopScanning();
    }

    @Override
    protected void onResume() {
        super.onResume();
        architectView.onResume();
        stopScanning();
    }


    /*========== CUSTOM FUNCTIONS ===============================*/


    /**
     * Function checks for camera permission and asks for it if it's not granted yet.
     * Necessary to use the architectView.
     */
    private void cameraPermission() {
        int permissionCheck = ContextCompat.checkSelfPermission(this,
                Manifest.permission.CAMERA);

        if (permissionCheck == PackageManager.PERMISSION_GRANTED) {
            // you have the permission, everything is fine
        } else {
            // you do not have the permission, so ask for it
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.CAMERA},
                    CAMERA_PERMISSION_CODE);
        }
    }

    /**
    * Starts GameHub with Info about the game that's to be started
    * @param game: String containing the name of the scanned game.
    */
    public void startGameHub(String game) {
        Intent intent = new Intent(this, GameHubActivity.class);
        intent.putExtra("name", game);
        startActivity(intent);
    }

    /**
     * Functions toggles visisbility of scanBtn between visible and invisible.
     * @param hide Boolean. Set true if you want to hide the button, false to show it.
     */
    public void toggleScanButton(boolean hide){
        if (hide){
            this.scanBtn.setVisibility(View.INVISIBLE);
        }
        else{
            this.scanBtn.setVisibility(View.VISIBLE);
        }

    }

    /**
     * Function starts scanning for markers by loading the augmentation HTML. Sets text on scanBtn
     * to "Stop" and animates the button so it's smaller and out of the way.
     */
    public void startScanning(){
        try {
            Log.d(TAG, "Loading augmentation html.");
            architectView.load("prototyp/augmentation/index.html");

            // set Btn Text to STOP & animate it to be smaller/further down
            scanBtn.setText(R.string.scanbtn_stop);
            scanBtn.animate()
                    .scaleX(0.5f)
                    .scaleY(0.5f)
                    .translationY(450f)
                    .setStartDelay(0)
                    .setDuration(200);

            isScanning = true;
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Unable to load html file: " + e.getMessage());
        }
    }

    /**
     * Function stops scanning by loading no file. Sets text on scanBtn back to "START" and
     * animates it so it's back at its original position and size.
     */
    public void stopScanning(){

            architectView.callJavascript("World.close();");

            mHandler.postDelayed(new Runnable() {
                public void run() {
                    try {
                        Log.d(TAG,"Trying to load empty file.");
                    architectView.load("prototyp/augmentation/empty.html");
                    Log.d(TAG,"Loaded empty file.");
                    } catch (Exception e) {
                        e.printStackTrace();
                        Log.d(TAG,"Unable to load empty file. "+ e.getMessage());
                    }
                }
            }, 500);


        // set Btn Text to START & animate back to original size/position
        scanBtn.setText(R.string.scanbtn_start);
        scanBtn.animate()
                .scaleX(1.0f)
                .scaleY(1.0f)
                .translationY(0f)
                .setStartDelay(0)
                .setDuration(200);

        isScanning = false;
    }

    /*========== GETTER & SETTER ===============================*/
}
