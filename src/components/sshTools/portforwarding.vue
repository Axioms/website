<template>
    <div class="portforwarding">
        <div class="card">
            <div class="card-header shadow rounded-top">
                <h4 class="text-primary title d-inline-block">SSH Port Forwarding</h4>
            </div>
            <div class="card-body shadow bg-white rounded-bottom">
                <div>
                    <div class="row">
                        <div class="col-md-12 col-lg-6">    
                            <form id="port-forwarding">
                                <div class="row">
                                    <div class="col">
                                        <select class="custom-select" v-model="portType">
                                            <option selected="" disabled="">Type</option>
                                            <option value="-L">Local</option>
                                            <option value="-R">Remote</option>
                                            <option value="-D">Dynamic</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <input type="text" class="form-control" placeholder="Optional Arguments" v-model="args">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <input type="text" class="form-control" id="localAddress" placeholder="Local Address" v-model="localAdd">
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control" placeholder="Server SSH Login" v-model="remoteAdd">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <input type="number" class="form-control" placeholder="Local Port" v-model="localPort">
                                    </div>
                                    <div class="col">
                                        <input v-if="this.portType == '-D'" type="number" class="form-control" id="remotePort" placeholder="Server Port" v-model="remotePort" readonly="">
                                        <input v-else type="number" class="form-control" id="remotePort" placeholder="Server Port" v-model="remotePort">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-group mb-3 col">
                                        <input type="text" id="ssh-forward" class="form-control bg-light rounded-left" @click="makeCommand" aria-label="" v-model="command" aria-describedby="basic-addon2" readonly>
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-primary" id="popunder" v-b-popover.bottom="displayPop" type="button" data-clipboard-target="#ssh-forward"  @click="doCopy">Copy <font-awesome-icon :icon="['far','clipboard']" /></button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="col-md-12 col-lg-6">
                            <h3 class="display-4">Arguments</h3>
                            <p class="list-item">Local - Specifies that the given port on the local (client) host is to be forwarded to the given host and port on the remote side.</p>
                            <p class="list-item">Remote - Specifies that the given port on the remote (server) host is to be forwarded to the given host and port on the local side.</p>
                            <p class="list-item">Dynamic - Specifies a local ''dynamic'' application-level port forwarding.</p>
                            <p class="list-item">-C allows compression</p>
                            <p class="list-item">-f - Requests ssh to go to background just before command execution. </p>
                            <p class="list-item">-N Do not execute a remote command. This is useful for just forwarding ports</p>
                            <p class="list-item">More info <a target="_blank" href="https://linux.die.net/man/1/ssh">Here</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            portType : 'Type',
            args: '',
            localAdd: '',
            remoteAdd: '',
            localPort: '',
            remotePort: '',
            command: '',
            popoverMessage: null
        }
    },
    methods: {
    doCopy() {
      this.$copyText(this.command).then(() => {
        this.popoverMessage = true;
      },() => {
        this.popoverMessage = false;
			}).then (() => {
				this.$root.$emit('bv::show::popover', 'popunder');
			});
			
    }
  },
  computed : {
    displayPop() {
      if (this.popoverMessage) {    
        return {
          html: true,
          content: () => {
            return '<p style="color:#0da346; font-size:1.3em; margin: 0px">Success!</p>'
          }
        }
      }
      else {
        return {
          html: true,
          content: () => {
            return '<p style="color:#8c0808; font-size:1.3em; margin: 0px">Failed!</p>'
          }
        }
      }
    },
     makeCommand() {
            if (this.portType == '-D') {
                return "ssh" + " " + this.args + " " + this.portType + " " + this.remoteAdd;
             }
             else if (this.portType == '-R') {
                 return "ssh" + " " + this.portType + " " + this.args + " " + this.remotePort + ":" + this.localAdd + ":" + this.localPort + " " + this.remoteAdd;
             }
             else if (this.portType == '-L') {
                return "ssh" + " " + this.portType + " " + this.args + " " + this.localPort + ":" + this.localAdd + ":" + this.remotePort + " " + this.remoteAdd;
             }
             else {
                return {
                    html: true,
                    content: () => {
                        return '<p style="color:#8c0808; font-size:1.3em; margin: 0px">Failed!</p>'
                    }
                }
             }
         }
  }
}
</script>


<style lang="scss" scoped>
    .container {
    padding-top: 5%;
}
.display-4 {
    text-align: center;
}
.card {
    width: 100%;
    padding-bottom: 5%;
    border: none;
}
.title-icon {
    font-size: 1.5rem;
    vertical-align: middle;
    float: right;
}
.rotated {
    transform : rotate(180deg);
}
.download-list {
    list-style: none;
}
.d-icon {
    font-size: 2em;
    text-align: center;
}
.d-icon a span i:hover {
    color: #007bff;
}
.d-text {
    text-align: center;
}
@media screen and (min-width: 450px) {
    .d-text {
        font-size: 1em;
    }
}
@media screen and (max-width: 450px) {
    .d-text {
        font-size: 0.8em;
    }
}
@media screen and (max-width: 395px) {
    .d-text {
        font-size: 0.6em;
    }
}
.display-5 {
    font-size: 2rem;
    font-weight: 300;
    line-height: 1.2;
    display: inline-block;
}
.list-item {
    display: inline-block;
    font-family: 'Ubuntu', sans-serif;
    line-height: 1rem;
}
.row-top-padding {
    padding-top: 5%;
}
.center {
    text-align: center;
}
.row {
    padding-bottom: 5%;
}
</style>