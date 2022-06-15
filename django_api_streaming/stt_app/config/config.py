import os
import json
from functools import lru_cache

class ConfigSTT:
    
    @lru_cache(maxsize=32)
    def get_config(self, key):
        print('inside module')
        module_dir = os.path.dirname(__file__)  # get current directory
        file_path = os.path.join(module_dir, 'config.json')
        
        with open(file_path, 'r') as f:
            config = json.load(f)
            
        stt_config = config['stt']
        model = stt_config['model']
        lm = stt_config['lm']
        trie = stt_config['trie']
        audiofiledir = stt_config['audiofiledir']
        audiofilelength = stt_config['audiofilelength']
        debug = stt_config['debug']
        if key == 'model':
            return model
        elif key == 'lm':
            return lm
        elif key == 'trie':
            return trie
        elif key == 'audiofiledir':
            return audiofiledir
        elif key == 'audiofilelength':
            return audiofilelength
        elif key == 'debug':
            return debug
        else:
            raise Exception('Invalid key value.')
        