package waldemarapp.waldemar.ViewController;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.support.annotation.Nullable;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;

import com.wikitude.architect.ArchitectStartupConfiguration;
import com.wikitude.architect.ArchitectView;

import java.io.IOException;

import waldemarapp.waldemar.Helper.Helper;
import waldemarapp.waldemar.R;

/**
 * The MainActivity where markers can be scanned.
 */
public class MainActivity extends AppCompatActivity {

    /*========== VARS ===============================*/
    // Statics
    private static final String WIKITUDE_KEY = "Hp/fXCJzZARFV7BHmgN9jCn6OBerUtUPX4mF+2gHUV8zfq1tyxUWdrrnGodkDrM5mcqfq8H5udGDcHVJ/M/Hvezoa9nH0BaMpW/fRiJxFr/A4SWaL5Rokl80uazjrJvGX1WrE/OGVVKYkwO9N33KPbZ0MbHp4chQB95Z7M8k1kNTYWx0ZWRfX6XJ+mvnPZ8m15Lu5AQutwKqPx4HGlN1S2rmFw81DERjkY3l2M8Ek4fiK7cMPw2eH6BiBihHRi1a2eGBZ1eA6v8yONwKVSdPp6ScIClHTi94tRfixwg3ORDh/eWIKUJF49mTzMw6D+iqekHmWK3l4V6MUuNCmYvkzTz8gRFQMe+QAspnV50k9guTiIflynztBnIZc8XdfUMBKra8HMLyKqUuRqj0OLs3Biv+jAxVHJvJdgo2BcLAaXVysySImAwY/oAvmf5+x/xkaAW0excDl2mdEbMVaPd2nPx9/SCAGxwXPefyMKmdVwuO1A8EP4aY69wFKzzzJJbYl4efOjv0QCvRhaRTGsnCz2maJTwZIewO7NvZ6GivMBK6F8HiZKeN/32vfnWx2qtAUjnjMchqVGK3schnSpTfGhkX5qMSwUkxqX3iv6VI6dsUMj0i15m8tGDK/xiLlan8D4vtoEFeVJQgoexYnFWS9HROybQWFH1JnFkdCw0NnWX+4LN7Fd9rUJQPDr/KRLKs3Pl/sCnlq3HMYmikqSXTMg==";
    private static final int CAMERA_PERMISSION_CODE = 221; //random number necessary to request camera permission

    // UI Elements
    private ArchitectView architectView;
    private ImageButton helpBtn;  //ImageButton to open help with
    private Button startBtn; //Button to start/stop scanning for markers

    // Status
    private boolean isScanning; //true if wikitude is loading AR World (or tries to)

    // etc.
    private Helper Helper;

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
        this.helpBtn = (ImageButton)this.findViewById(R.id.imgBtn_ScanHelp);
        this.startBtn = (Button)this.findViewById(R.id.btn_scanstart);

        // Init Callbacklistener Helper
        Helper = new Helper(MainActivity.this);
        architectView.registerWorldLoadedListener(Helper);
        architectView.addArchitectJavaScriptInterfaceListener(Helper);
    }

    @Override
    protected void onPostCreate(@Nullable Bundle savedInstanceState) {
        super.onPostCreate(savedInstanceState);
        architectView.onPostCreate(); //this is what starts the camera

        //start scanning / loading arWorld on click
        startBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Scan starten
                if(!isScanning){
                    try {
                        architectView.load("prototyp/augmentation/index.html");
                        startBtn.setText(R.string.scanbtn_stop);
                        isScanning = true;
                    } catch (IOException e) {
                        e.printStackTrace();
                        System.out.println("Unable to load html file: " + e.getMessage());
                    }
                }
                // Scan beenden
                else {
                    try {
                        architectView.load(" ");
                    } catch (IOException e) {
                        e.printStackTrace();
                        System.out.println("Unable to load html file: " + e.getMessage());
                    }
                    startBtn.setText(R.string.scanbtn_start);
                    isScanning = false;
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
    }

    @Override
    protected void onResume() {
        super.onResume();
        architectView.onResume();
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

    /*========== GETTER & SETTER ===============================*/
}
