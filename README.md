# 2test.github.io
<!DOCTYPE html>
<html>
<head>
    <title>Greeting Page</title>
</head>
<body>
    <h1 id="greeting">Hi!</h1>
    <button id="dumbButton">Click me for "You dumb?"</button>
    <button id="baadButton">Click me for "U baaad!"</button>

    <script>
        document.getElementById("dumbButton").addEventListener("click", function() {
            document.getElementById("greeting").textContent = "You dumb?";
        });

        document.getElementById("baadButton").addEventListener("click", function() {
            document.getElementById("greeting").textContent = "U baaad!";
        });
    </script>
</body>
</html>
