from django.apps import AppConfig
from stt import Model
from stt_app.config import config

# These constants control the beam search decoder

# Beam width used in the CTC decoder when building candidate transcriptions
BEAM_WIDTH = 500

# The alpha hyperparameter of the CTC decoder. Language Model weight
LM_ALPHA = 0.75

# The beta hyperparameter of the CTC decoder. Word insertion bonus.
LM_BETA = 1.85

# These constants are tied to the shape of the graph used (changing them changes
# the geometry of the first layer), so make sure you use the same constants that
# were used during training

# Number of MFCC features to use
# N_FEATURES = 26

# Size of the context window used for producing timesteps in the input vector
# N_CONTEXT = 9


class STT(AppConfig):
    name = 'stt_app'
    conf = config.ConfigSTT()
    model = conf.get_config('model')
    scorer = conf.get_config('lm')

    stt_model = Model(model)
    stt_model.setBeamWidth(BEAM_WIDTH)
    if scorer:
        stt_model.enableExternalScorer(scorer)
        stt_model.setScorerAlphaBeta(LM_ALPHA, LM_BETA)

    def ready(self):
        print("Deepspeech Server Initialization")
