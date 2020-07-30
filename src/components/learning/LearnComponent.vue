<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex xs12>

        <v-btn v-on:click="open_dlg">Dlg Wrapper</v-btn>

        <dlg-wrapper ref="dlg">
          <dlg-frame title="Dialog" message="Message"></dlg-frame>
        </dlg-wrapper>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import DlgWrapper from "@/components/whiteboard/DlgWrapper";
import DlgFrame from "@/components/whiteboard/DlgFrame";

export default {
  data: () => {
    return {};
  },

  methods: {
    open_dlg: function(event) {
      this.$refs.dlg.open().then(result => {
        console.log("Result:", result);
      });
    }
  },

  components: {
    DlgWrapper,
    DlgFrame
  }
};

</script>