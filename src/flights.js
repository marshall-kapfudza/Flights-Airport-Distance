var IntentMedia = IntentMedia || {};

IntentMedia.Airports = (function () {
  const pub = {};

  pub.airport_exists = function (airport_code) {
    return pub.airport_distances().hasOwnProperty(airport_code);
  };

  pub.airport_distances = function () {
    const data = {
      JFK: {
        LAX: 2475,
        LAS: 2248,
        PDX: 2454,
      },
      LAX: {
        JFK: 2475,
        LAS: 236,
        PDX: 834,
      },
      LAS: {
        JFK: 2248,
        LAX: 236,
        PDX: 763,
      },
      PDX: {
        JFK: 2454,
        LAS: 763,
        LAX: 834,
      },
    };
    return data;
  };

  return pub;
}(IntentMedia || {}));

IntentMedia.Distances = (function () {
  const pub = {};
  var airport_distances = airport_distances || IntentMedia.Airports.airport_distances();

  pub.distance_between_airports = function (from_airport, to_airport) {
    if (IntentMedia.Airports.airport_exists(from_airport) && IntentMedia.Airports.airport_exists(to_airport)) {
      if (from_airport === to_airport) {
        return 0;
      }
      return airport_distances[from_airport][to_airport];
    }
    return -1;
  };

  pub.airport_distance_button = function () {
    const a = document.getElementById('IntentMediaPointA').value.toUpperCase();
    const b = document.getElementById('IntentMediaPointB').value.toUpperCase();
    const svg = document.getElementById('plane');
    const value = IntentMedia.Distances.distance_between_airports(a, b);
    
    if(value != -1) {
      svg.classList.add('success');
      document.getElementById('output').innerHTML = `<p>
        The distance between <b>${a}</b> to <b>${b}</b> is <b>${value} Miles</b></p>
      `;
    } else {
      svg.classList.remove('success');
      document.getElementById('output').innerHTML = `
        <p class="error">
          Oops! Airpot distance from <b>${a}</b> to <b>${b}</b> does not exist
        </p>
      `;
    }
  };

  return pub;
}(IntentMedia || {}));
